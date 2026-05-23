const { Router } = require('express')
const { pool } = require('../db')

const router = Router()

router.get('/health', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS time')
    res.json({ status: 'ok', db: 'ok', time: rows[0].time })
  } catch {
    res.status(503).json({ status: 'error', db: 'unreachable' })
  }
})

module.exports = router
