const sanitizeHtml = require('sanitize-html')

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const ID_RE = /^\d{1,10}$/
// Alphanumeric + dash/underscore only — prevents path traversal in courseId/lessonId
const SAFE_ID_RE = /^[a-zA-Z0-9_-]{1,100}$/

// Strip all HTML tags and attributes — robust against malformed/nested tag bypasses
function stripHtml(str) {
  return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} }).trim()
}

function userToken(value) {
  return typeof value === 'string' && UUID_RE.test(value)
}

function safeId(value) {
  return typeof value === 'string' && SAFE_ID_RE.test(value)
}

function content(value) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= 5000
}

function intId(value) {
  return typeof value === 'string' && ID_RE.test(value) && parseInt(value, 10) > 0
}

// Express middleware: validates GET /api/notes query params
function validateGetNotes(req, res, next) {
  const { courseId, lessonId, userToken: token } = req.query
  if (!safeId(courseId)) return res.status(400).json({ error: 'invalid courseId' })
  if (!safeId(lessonId)) return res.status(400).json({ error: 'invalid lessonId' })
  if (!userToken(token)) return res.status(400).json({ error: 'invalid userToken' })
  next()
}

// Express middleware: validates POST /api/notes body
function validateCreateNote(req, res, next) {
  const { userToken: token, courseId, lessonId, content: body } = req.body
  if (!userToken(token)) return res.status(400).json({ error: 'invalid userToken' })
  if (!safeId(courseId)) return res.status(400).json({ error: 'invalid courseId' })
  if (!safeId(lessonId)) return res.status(400).json({ error: 'invalid lessonId' })
  if (!content(body)) return res.status(400).json({ error: 'content missing or too long (max 5000)' })
  // Sanitize: strip HTML tags before passing downstream
  req.body.content = stripHtml(body)
  next()
}

// Express middleware: validates DELETE /api/notes/:id
function validateDeleteNote(req, res, next) {
  const { userToken: token } = req.body
  if (!userToken(token)) return res.status(400).json({ error: 'invalid userToken' })
  if (!intId(req.params.id)) return res.status(400).json({ error: 'invalid id' })
  next()
}

module.exports = { validateGetNotes, validateCreateNote, validateDeleteNote }
