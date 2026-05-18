import { useState, useEffect } from 'react'
import Quiz from './Quiz'
import type { Question, LessonProgress } from '../types'

interface Props {
  questions: Question[]
  courseId: string
  lessonId: string
  progress?: LessonProgress
}

export default function QuizDialog({ questions, courseId, lessonId, progress }: Props) {
  const [open, setOpen] = useState(false)
  const [quizKey, setQuizKey] = useState(0)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function handleOpen() {
    setQuizKey((k) => k + 1)
    setOpen(true)
  }

  const done = progress?.completed

  return (
    <>
      {/* Trigger */}
      <div className="mt-6 rounded-2xl border border-white/10 overflow-hidden">
        <div className="bg-[#1a1a28] px-5 py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span>🧠</span>
            <div>
              <h3 className="font-bold text-white leading-tight">בחן את עצמך</h3>
              <p className="text-slate-500 text-sm">
                {Math.min(5, questions.length)} שאלות אקראיות מתוך {questions.length}
              </p>
            </div>
          </div>
          {done && (
            <div className="text-right">
              <div className="text-emerald-400 font-bold">
                {progress.score}/{progress.total}
              </div>
              <div className="text-slate-500 text-sm">נקודות</div>
            </div>
          )}
        </div>

        <div className="px-5 py-3 flex items-center justify-between">
          {done ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <span>✓</span>
              <span>הבחינה הושלמה</span>
            </div>
          ) : (
            <p className="text-slate-400">מוכן לבדוק את עצמך?</p>
          )}
          <button
            onClick={handleOpen}
            className={`px-5 py-2 rounded-xl font-semibold transition-all ${
              done
                ? 'bg-white/8 text-slate-300 hover:bg-white/12'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {done ? 'נסה שוב' : 'התחל בחינה ←'}
          </button>
        </div>
      </div>

      {/* Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#0e0e18] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/12 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog header */}
            <div className="sticky top-0 bg-[#0e0e18] flex items-center justify-between px-5 py-3 border-b border-white/10 z-10">
              <div className="flex items-center gap-2">
                <span>🧠</span>
                <span className="font-bold text-white">בחינה</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-all text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <Quiz
                key={quizKey}
                questions={questions}
                courseId={courseId}
                lessonId={lessonId}
                onComplete={() => {}}
                embedded
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
