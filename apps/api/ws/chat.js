const { WebSocketServer, OPEN } = require('ws')
const { randomUUID } = require('crypto')
const { allowedOrigins } = require('../middleware/cors')

const isProd = process.env.NODE_ENV === 'production'

const MAX_PAYLOAD_BYTES = 2048
const MAX_CONNS_PER_IP   = 4
const MAX_TOTAL_CONNS    = 150
const MSG_LIMIT          = 15   // הודעות מקסימום לחלון זמן
const MSG_WINDOW_MS      = 10_000

// ip → { count, resetAt }
const msgRate = new Map()

function getIp(req) {
  return (req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim()
}

function isRateLimited(ip) {
  const now = Date.now()
  let entry = msgRate.get(ip)
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + MSG_WINDOW_MS }
    msgRate.set(ip, entry)
  }
  entry.count++
  return entry.count > MSG_LIMIT
}

function connsFromIp(wss, ip) {
  let n = 0
  for (const c of wss.clients) if (c._ip === ip) n++
  return n
}

function createChatServer(httpServer) {
  const wss = new WebSocketServer({
    server: httpServer,
    path: '/ws/chat',
    maxPayload: MAX_PAYLOAD_BYTES,
    verifyClient({ origin, req }, cb) {
      if (!origin && !isProd) return cb(true)
      if (!allowedOrigins.includes(origin)) return cb(false, 403, 'Forbidden')

      const ip = getIp(req)
      if (wss.clients.size >= MAX_TOTAL_CONNS) return cb(false, 503, 'Server full')
      if (connsFromIp(wss, ip) >= MAX_CONNS_PER_IP) return cb(false, 429, 'Too many connections')
      cb(true)
    },
  })

  // ping/pong — ניקוי חיבורים מתים כל 30 שניות
  const pingInterval = setInterval(() => {
    for (const ws of wss.clients) {
      if (!ws._alive) { ws.terminate(); continue }
      ws._alive = false
      ws.ping()
    }
  }, 30_000)

  wss.on('close', () => clearInterval(pingInterval))

  wss.on('connection', (ws, req) => {
    ws._ip    = getIp(req)
    ws._alive = true

    ws.on('pong', () => { ws._alive = true })

    ws.on('message', (raw) => {
      if (raw.length > MAX_PAYLOAD_BYTES) return ws.terminate()

      if (isRateLimited(ws._ip)) {
        ws.send(JSON.stringify({ type: 'error', message: 'אתה שולח הודעות מהר מדי — המתן רגע' }))
        return
      }

      let parsed
      try { parsed = JSON.parse(raw) } catch { return }

      if (parsed.type !== 'message') return
      const text = String(parsed.text ?? '').trim().slice(0, 500)
      if (!text) return

      const outgoing = JSON.stringify({
        type: 'message',
        id: randomUUID(),
        text,
        userId: String(parsed.userId ?? 'anon').slice(0, 64),
        name: String(parsed.name ?? 'אנונימי').slice(0, 30),
        avatar: String(parsed.avatar ?? '🐶').slice(0, 8),
        at: Date.now(),
      })

      for (const client of wss.clients) {
        if (client.readyState === OPEN) client.send(outgoing)
      }
    })

    ws.on('error', (err) => console.error('[ws]', err.message))
  })

  console.log('WebSocket chat ready on /ws/chat')
  return wss
}

module.exports = { createChatServer }
