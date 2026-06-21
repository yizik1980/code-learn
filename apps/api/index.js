require('dotenv').config()
const http = require('http')
const express = require('express')
const helmet = require('helmet')
const { initDb } = require('./db')
const { applyCors } = require('./middleware/cors')
const { globalLimiter } = require('./middleware/rateLimiter')
const { createChatServer } = require('./ws/chat')
const healthRouter = require('./routes/health')
const notesRouter = require('./routes/notes')

const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'

// Trust Render's reverse proxy — required for correct IP in rate-limit checks
app.set('trust proxy', 1)

// ─── Security headers ─────────────────────────────────────────────────────────

app.use(helmet())

// ─── CORS ─────────────────────────────────────────────────────────────────────

applyCors(app)

// ─── Body parsing ─────────────────────────────────────────────────────────────

app.use(express.json({ limit: '10kb' }))

// ─── Rate limiting ────────────────────────────────────────────────────────────

app.use('/api', globalLimiter)

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/api', healthRouter)
app.use('/api/notes', notesRouter)

// ─── 404 ─────────────────────────────────────────────────────────────────────

app.use((_req, res) => res.status(404).json({ error: 'not found' }))

// ─── Global error handler ─────────────────────────────────────────────────────

app.use((err, _req, res, _next) => {
  const status = err.status ?? 500
  if (!isProd) console.error(err)
  if (isProd && status === 500) console.error('[error]', err.message)
  res.status(status).json({ error: isProd && status === 500 ? 'שגיאת שרת' : err.message })
})

// ─── Start ────────────────────────────────────────────────────────────────────

const httpServer = http.createServer(app)
createChatServer(httpServer)

httpServer.listen(PORT, () => console.log(`API listening on :${PORT}`))

initDb().catch((err) => {
  console.error('DB init failed', err)
  // לא קורסים — השרת עולה, /api/health ו-WebSocket עובדים
  // קריאות ל-/api/notes יחזירו 503 עד שה-DB יתאושש
})
