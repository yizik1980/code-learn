import { Link } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'
import { getCourseStats } from '../signals/progress'
import type { Course } from '../types'

interface Props {
  course: Course
}

export default function CourseCard({ course }: Props) {
  useSignals()
  const stats = getCourseStats(course.id, course.lessons.length)

  if (course.comingSoon) {
    return (
      <div
        className="p-6 select-none"
        aria-label={`${course.title} — בקרוב`}
        aria-disabled="true"
        style={{
          background: '#f5f5f5',
          border: '2px solid #c4c4cc',
          boxShadow: '3px 3px 0 #c4c4cc',
          borderRadius: 16,
          opacity: 0.7,
          cursor: 'not-allowed',
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <span style={{ fontSize: '2rem' }} role="img" aria-label={course.title}>{course.emoji}</span>
          <span
            className="font-bold"
            style={{
              background: '#e8e8f0',
              color: '#9090a0',
              border: '2px solid #c4c4cc',
              borderRadius: 8,
              padding: '2px 10px',
              fontSize: '0.85rem',
            }}
          >
            בקרוב
          </span>
        </div>
        <h3 className="font-black mb-1" style={{ fontSize: '1.3rem', color: '#9090a0' }}>
          {course.title}
        </h3>
        <p style={{ color: '#b0b0c0', fontSize: '1rem' }}>{course.description}</p>
      </div>
    )
  }

  const pct = stats.percent

  return (
    <Link
      to={`/learn/${course.id}`}
      className="block"
      aria-label={`${course.title} — ${course.description}. ${stats.completed} מתוך ${course.lessons.length} שיעורים הושלמו`}
    >
      <article className="brutal-card p-6">
        <div className="flex items-start justify-between mb-3">
          <span style={{ fontSize: '2rem' }} role="img" aria-label={course.title}>{course.emoji}</span>
          {pct > 0 && (
            <span
              className="font-black"
              style={{
                background: course.color,
                color: '#fff',
                border: '2px solid #1c1c2e',
                boxShadow: '2px 2px 0 #1c1c2e',
                borderRadius: 8,
                padding: '2px 10px',
                fontSize: '0.85rem',
              }}
            >
              {pct}% הושלם
            </span>
          )}
        </div>

        <h3 className="font-black mb-1" style={{ fontSize: '1.3rem', color: '#1c1c2e' }}>
          {course.title}
        </h3>
        <p className="mb-4" style={{ color: '#5a5a72', fontSize: '1rem' }}>
          {course.description}
        </p>

        <div
          className="flex items-center justify-between mb-3"
          style={{ color: '#8080a0', fontSize: '0.95rem' }}
        >
          <span>{course.lessons.length} שיעורים</span>
          <span>
            {stats.completed} / {course.lessons.length} הושלמו
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="w-full rounded-full overflow-hidden mb-4"
          style={{ height: 8, background: '#e8e4dc', border: '1.5px solid #1c1c2e' }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`התקדמות בקורס ${course.title}: ${pct}%`}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: course.color }}
          />
        </div>

        <div
          className="brutal-btn w-full py-2.5 text-center font-black"
          style={{
            background: pct === 0 ? course.color : '#fff',
            color: pct === 0 ? '#fff' : '#1c1c2e',
            fontSize: '1rem',
          }}
        >
          {stats.completed === 0 ? 'התחל ללמוד ←' : 'המשך ←'}
        </div>
      </article>
    </Link>
  )
}
