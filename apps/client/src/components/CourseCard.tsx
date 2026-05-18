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
      <div className="glass rounded-2xl p-6 opacity-60 cursor-not-allowed select-none">
        <div className="flex items-start justify-between mb-4">
          <span className="text-5xl">{course.emoji}</span>
          <span className="text-sm bg-white/10 text-slate-400 px-3 py-1 rounded-full">
            בקרוב
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-lg text-slate-400">{course.description}</p>
      </div>
    )
  }

  return (
    <Link to={`/learn/${course.id}`} className="block group">
      <div
        className="rounded-2xl p-6 border transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: stats.percent > 0 ? `${course.color}40` : 'rgba(255,255,255,0.08)',
          boxShadow: stats.percent > 0 ? `0 0 30px ${course.color}15` : 'none',
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <span className="text-5xl">{course.emoji}</span>
          {stats.percent > 0 && (
            <span
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{ background: `${course.color}25`, color: course.color }}
            >
              {stats.percent}% הושלם
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-lg text-slate-400 mb-5">{course.description}</p>

        <div className="flex items-center justify-between text-base text-slate-500 mb-3">
          <span>{course.lessons.length} שיעורים</span>
          <span>{stats.completed} / {course.lessons.length} הושלמו</span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${stats.percent}%`,
              background: `linear-gradient(90deg, ${course.color}, ${course.color}cc)`,
            }}
          />
        </div>

        <div
          className="mt-5 w-full py-3 rounded-xl text-center font-bold text-lg transition-all"
          style={{
            background: `${course.color}20`,
            color: course.color,
          }}
        >
          {stats.completed === 0 ? 'התחל ללמוד ←' : 'המשך ←'}
        </div>
      </div>
    </Link>
  )
}
