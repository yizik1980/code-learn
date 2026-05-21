require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { Pool } = require('pg')
const { validateGetNotes, validateCreateNote, validateDeleteNote } = require('./middleware/validate')

const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'

// ─── Database ────────────────────────────────────────────────────────────────

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
})

// ─── Security headers (helmet) ───────────────────────────────────────────────

app.use(helmet())

// ─── CORS — whitelist only known origins ─────────────────────────────────────

const ALLOWED = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(
  cors({
    origin(origin, cb) {
      // allow server-to-server / curl in dev (no origin header)
      if (!origin && !isProd) return cb(null, true)
      if (ALLOWED.includes(origin)) return cb(null, true)
      cb(new Error(`CORS: origin '${origin}' not allowed`))
    },
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
)

// ─── Body parsing — hard limit to prevent large-payload attacks ───────────────

app.use(express.json({ limit: '10kb' }))

// ─── Rate limiting ────────────────────────────────────────────────────────────

// Global: 200 requests per 15 min per IP
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'יותר מדי בקשות — נסה שוב בעוד כמה דקות' },
  }),
)

// Write operations: stricter — 30 per 15 min per IP
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'יותר מדי פעולות כתיבה — נסה שוב בעוד כמה דקות' },
})

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/health
app.get('/api/health', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS time')
    res.json({ status: 'ok', db: 'ok', time: rows[0].time })
  } catch {
    res.status(503).json({ status: 'error', db: 'unreachable' })
  }
})

// GET /api/notes?courseId=&lessonId=&userToken=
app.get('/api/notes', async (req, res, next) => {
  try {
    const { courseId, lessonId, userToken } = req.query
    const { rows } = await pool.query(
      `SELECT id, content, created_at
       FROM notes
       ORDER BY created_at ASC`,
      [userToken, courseId, lessonId],
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

// POST /api/notes
app.post('/api/notes', writeLimiter, validateCreateNote, async (req, res, next) => {
  try {
    const { userToken, courseId, lessonId, content } = req.body
    const { rows } = await pool.query(
      `INSERT INTO notes (user_token, course_id, lesson_id, content)
       VALUES ($1, $2, $3, $4) RETURNING id, content, created_at`,
      [userToken, courseId, lessonId, content],
    )
    res.status(201).json(rows[0])
  } catch (err) {
    next(err)
  }
})

// DELETE /api/notes/:id
app.delete('/api/notes/:id', writeLimiter, validateDeleteNote, async (req, res, next) => {
  try {
    const { userToken } = req.body
    await pool.query(
      'DELETE FROM notes WHERE id=$1 ',
      [req.params.id, userToken],
    )
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// ─── 404 ─────────────────────────────────────────────────────────────────────

app.use((_req, res) => res.status(404).json({ error: 'not found' }))

// ─── Global error handler — never leak stack traces to client ─────────────────

app.use((err, _req, res, _next) => {
  const status = err.status ?? 500
  if (!isProd) console.error(err)
  // In production only log, never expose internals
  if (isProd && status === 500) console.error('[error]', err.message)
  res.status(status).json({ error: isProd && status === 500 ? 'שגיאת שרת' : err.message })
})

// ─── Init ─────────────────────────────────────────────────────────────────────

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id         SERIAL PRIMARY KEY,
      user_token TEXT NOT NULL,
      course_id  TEXT NOT NULL,
      lesson_id  TEXT NOT NULL,
      content    TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS notes_lookup
      ON notes (user_token, course_id, lesson_id);
  `)
  console.log('DB ready')
}

init()
  .then(() => app.listen(PORT, () => console.log(`API listening on :${PORT}`)))
  .catch((err) => { console.error('DB init failed', err); process.exit(1) })
