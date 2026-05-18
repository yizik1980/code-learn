import { Link } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'
import { getLessonProgress, getCourseStats } from '../../../signals/progress'
import { sqlLessons } from '../../../data/sql/lessons'

export default function SqlIndex() {
  useSignals()
  const stats = getCourseStats('sql', sqlLessons.length)

  return (
    <div className="min-h-screen bg-[#08080f]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(16,185,129,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 py-12">
        {/* Nav */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-lg mb-10"
        >
          → חזרה לדף הבית
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="text-6xl mb-4">🗄️</div>
          <h1 className="text-5xl font-black text-white mb-3">SQL</h1>
          <p className="text-xl text-slate-400 mb-6">
            שפת השאילתות הסטנדרטית לניהול מסדי נתונים — מהבסיס ועד שאילתות מורכבות
          </p>

          {/* Progress bar */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg text-slate-300 font-medium">התקדמות</span>
              <span className="text-lg font-bold text-emerald-400">
                {stats.completed} / {stats.total} שיעורים
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-700"
                style={{
                  width: `${stats.percent}%`,
                  background: 'linear-gradient(90deg, #10b981, #34d399)',
                }}
              />
            </div>
            {stats.maxScore > 0 && (
              <p className="text-slate-500 text-base mt-2">
                ⭐ {stats.score} / {stats.maxScore} נקודות
              </p>
            )}
          </div>
        </div>

        {/* Lessons list */}
        <div className="space-y-3">
          {sqlLessons.map((lesson, idx) => {
            const prog = getLessonProgress('sql', lesson.id)
            const isLocked = false // all unlocked for now

            return (
              <Link
                key={lesson.id}
                to={`/learn/sql/${lesson.id}`}
                className={`block rounded-2xl p-5 border transition-all duration-200 ${
                  isLocked
                    ? 'opacity-50 pointer-events-none'
                    : 'hover:border-emerald-500/40 hover:bg-emerald-500/5'
                } ${
                  prog?.completed
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-white/8 bg-white/3'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Number / Check */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${
                      prog?.completed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/8 text-slate-400'
                    }`}
                  >
                    {prog?.completed ? '✓' : idx + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{lesson.emoji}</span>
                      <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                    </div>
                    <p className="text-base text-slate-400">{lesson.summary}</p>
                  </div>

                  {/* Score badge */}
                  {prog?.completed && (
                    <div className="shrink-0 text-right">
                      <div className="text-emerald-400 font-bold text-xl">
                        {prog.score}/{prog.total}
                      </div>
                      <div className="text-slate-500 text-sm">נקודות</div>
                    </div>
                  )}

                  <span className="text-slate-600 text-2xl shrink-0">←</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
