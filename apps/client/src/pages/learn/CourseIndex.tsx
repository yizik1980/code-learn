import { Link, useParams, Navigate } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'
import { getLessonProgress, getCourseStats } from '../../signals/progress'
import { courses } from '../../data/courses'

export default function CourseIndex() {
  useSignals()
  const { courseId } = useParams<{ courseId: string }>()

  const course = courses.find((c) => c.id === courseId)
  if (!course || course.comingSoon) return <Navigate to="/" replace />

  const stats = getCourseStats(course.id, course.lessons.length)

  return (
    <div className="min-h-screen" style={{ background: '#fef9f0' }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #c4b8a4 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 py-10">
        {/* Nav */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-bold mb-8 brutal-btn px-4 py-2"
          style={{ background: '#fff', color: '#1c1c2e', fontSize: '1rem' }}
        >
          → חזרה לדף הבית
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div style={{ fontSize: '3rem' }} className="mb-3">{course.emoji}</div>
          <h1 className="font-black mb-2" style={{ fontSize: '2.8rem', color: '#1c1c2e' }}>
            {course.title}
          </h1>
          <p className="mb-5" style={{ color: '#5a5a72', fontSize: '1.1rem' }}>
            {course.description}
          </p>

          {/* Progress card */}
          <div className="brutal-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold" style={{ color: '#1c1c2e' }}>התקדמות</span>
              <span className="font-black" style={{ color: course.color }}>
                {stats.completed} / {stats.total} שיעורים
              </span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 10, background: '#e8e4dc', border: '1.5px solid #1c1c2e' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${stats.percent}%`, background: course.color }}
              />
            </div>
            {stats.maxScore > 0 && (
              <p className="mt-2" style={{ color: '#8080a0', fontSize: '0.95rem' }}>
                ⭐ {stats.score} / {stats.maxScore} נקודות
              </p>
            )}
          </div>
        </div>

        {/* Lessons list */}
        <div className="space-y-3">
          {course.lessons.map((lesson, idx) => {
            const prog = getLessonProgress(course.id, lesson.id)

            return (
              <Link
                key={lesson.id}
                to={`/learn/${course.id}/${lesson.id}`}
                className="block brutal-card-sm p-4"
                style={{
                  background: prog?.completed ? '#f0fdf8' : '#ffffff',
                  borderColor: prog?.completed ? course.color : '#1c1c2e',
                  boxShadow: prog?.completed
                    ? `3px 3px 0 ${course.color}`
                    : '3px 3px 0 #1c1c2e',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-black shrink-0"
                    style={{
                      background: prog?.completed ? course.color : '#f0ece4',
                      color: prog?.completed ? '#fff' : '#5a5a72',
                      border: '2px solid',
                      borderColor: prog?.completed ? course.color : '#c4b8a4',
                      fontSize: '1.1rem',
                    }}
                  >
                    {prog?.completed ? '✓' : idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span style={{ fontSize: '1.2rem' }}>{lesson.emoji}</span>
                      <h3 className="font-black" style={{ color: '#1c1c2e', fontSize: '1.05rem' }}>
                        {lesson.title}
                      </h3>
                    </div>
                    <p style={{ color: '#8080a0', fontSize: '0.9rem' }}>{lesson.summary}</p>
                  </div>

                  {prog?.completed && (
                    <div className="shrink-0">
                      <div
                        className="font-black"
                        style={{
                          background: course.color,
                          color: '#fff',
                          border: '2px solid #1c1c2e',
                          boxShadow: '2px 2px 0 #1c1c2e',
                          borderRadius: 8,
                          padding: '2px 10px',
                          fontSize: '0.9rem',
                        }}
                      >
                        {prog.score}/{prog.total}
                      </div>
                    </div>
                  )}

                  <span style={{ color: '#c4b8a4', fontSize: '1.2rem' }}>←</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
