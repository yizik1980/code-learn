const rateLimit = require('express-rate-limit')

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'יותר מדי בקשות — נסה שוב בעוד כמה דקות' },
})

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'יותר מדי פעולות כתיבה — נסה שוב בעוד כמה דקות' },
})

const createNoteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.body?.userToken || req.ip,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'הגעת למגבלת יצירת הערות לשעה — נסה שוב מאוחר יותר' },
})

module.exports = { globalLimiter, writeLimiter, createNoteLimiter }
