const cors = require('cors')

const isProd = process.env.NODE_ENV === 'production'

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

const corsOptions = {
  origin(origin, cb) {
    // Allow same-origin / server-to-server requests in dev (no Origin header)
    if (!origin && !isProd) return cb(null, true)
    if (allowedOrigins.includes(origin)) return cb(null, true)
    cb(Object.assign(new Error(`CORS: origin '${origin}' not allowed`), { status: 403 }))
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset'],
  credentials: false,
  maxAge: 86400, // cache preflight for 24h
}

// Handle preflight for all routes
function applyCors(app) {
  app.options('*', cors(corsOptions))
  app.use(cors(corsOptions))
}

module.exports = { applyCors, allowedOrigins }
