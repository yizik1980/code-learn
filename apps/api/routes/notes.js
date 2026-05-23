const { Router } = require('express')
const { pool } = require('../db')
const { writeLimiter, createNoteLimiter } = require('../middleware/rateLimiter')
const { validateGetNotes, validateCreateNote, validateDeleteNote } = require('../middleware/validate')

const router = Router()

router.get('/', validateGetNotes, async (req, res, next) => {
  try {
    const { courseId, lessonId, userToken } = req.query
    const { rows } = await pool.query(
      `SELECT id, content, created_at
       FROM notes
       WHERE user_token=$1 AND course_id=$2 AND lesson_id=$3
       ORDER BY created_at ASC`,
      [userToken, courseId, lessonId],
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

router.post('/', writeLimiter, createNoteLimiter, validateCreateNote, async (req, res, next) => {
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

router.delete('/:id', writeLimiter, validateDeleteNote, async (req, res, next) => {
  try {
    const { userToken } = req.body
    await pool.query(
      'DELETE FROM notes WHERE id=$1 AND user_token=$2',
      [req.params.id, userToken],
    )
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

module.exports = router
