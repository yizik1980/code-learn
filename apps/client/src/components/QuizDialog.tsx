import { useState, useEffect, useRef } from 'react'
import Quiz from './Quiz'
import type { Question, LessonProgress } from '../types'

interface Props {
  questions: Question[]
  courseId: string
  lessonId: string
  progress?: LessonProgress
  color?: string
}

export default function QuizDialog({ questions, courseId, lessonId, progress, color = '#10b981' }: Props) {
  const [open, setOpen] = useState(false)
  const [quizKey, setQuizKey] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
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
      {/* Trigger card */}
      <div
        className="mt-6 overflow-hidden"
        style={{
          background: '#fff',
          border: '2px solid #1c1c2e',
          boxShadow: '4px 4px 0 #1c1c2e',
          borderRadius: 16,
        }}
      >
        {/* Card header */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{
            background: '#1c1c2e',
            borderBottom: '2px solid #1c1c2e',
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.3rem' }}>🧠</span>
            <div>
              <h3 className="font-black" style={{ color: '#fff', fontSize: '1rem' }}>
                בחן את עצמך
              </h3>
              <p style={{ color: '#9090b0', fontSize: '0.8rem' }}>
                {Math.min(5, questions.length)} שאלות אקראיות מתוך {questions.length}
              </p>
            </div>
          </div>
          {done && (
            <div
              className="font-black text-right"
              style={{
                background: '#10b981',
                border: '2px solid #fff',
                borderRadius: 8,
                padding: '2px 10px',
                color: '#fff',
                fontSize: '0.9rem',
              }}
            >
              {progress.score}/{progress.total} ✓
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="px-5 py-3 flex items-center justify-between">
          {done ? (
            <div className="flex items-center gap-2 font-bold" style={{ color: '#10b981' }}>
              <span>✓</span>
              <span>הבחינה הושלמה</span>
            </div>
          ) : (
            <p style={{ color: '#5a5a72' }}>מוכן לבדוק את עצמך?</p>
          )}
          <button
            onClick={handleOpen}
            className="brutal-btn px-5 py-2 font-black"
            style={{
              background: done ? '#fff' : color,
              color: done ? '#1c1c2e' : '#fff',
              fontSize: '0.95rem',
            }}
          >
            {done ? 'נסה שוב' : 'התחל בחינה ←'}
          </button>
        </div>
      </div>

      {/* Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28,28,46,0.6)', backdropFilter: 'blur(6px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            ref={scrollRef}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
            style={{
              background: '#fef9f0',
              border: '2px solid #1c1c2e',
              boxShadow: '6px 6px 0 #1c1c2e',
              borderRadius: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog header */}
            <div
              className="sticky top-0 flex items-center justify-between px-5 py-3 z-10"
              style={{
                background: '#1c1c2e',
                borderRadius: '18px 18px 0 0',
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '1.2rem' }}>🧠</span>
                <span className="font-black" style={{ color: '#fff' }}>בחינה</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center font-black transition-all"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '1rem',
                }}
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
                onStep={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' })}
                embedded
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
