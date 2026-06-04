import { useSignals } from '@preact/signals-react/runtime'
import { Link } from 'react-router-dom'
import { globalStatsSignal } from '../signals/progress'
import { userNameSignal } from '../signals/userName'
import { courses } from '../data/courses'
import CourseCard from '../components/CourseCard'

interface TodaySession { id: string; courseId: string; duration: 10 | 20 | 30 }

function getTodaySessions(): TodaySession[] {
  try {
    const today = new Date()
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const schedule = JSON.parse(localStorage.getItem('cl_schedule') ?? '{}') as Record<string, TodaySession[]>
    return schedule[key] ?? []
  } catch { return [] }
}

function getTimeGreeting(name: string): string {
  const hour = new Date().getHours()
  let greeting: string
  if (hour >= 5 && hour < 12) greeting = 'בוקר טוב'
  else if (hour >= 12 && hour < 17) greeting = 'צהריים טובים'
  else if (hour >= 17 && hour < 21) greeting = 'ערב טוב'
  else greeting = 'לילה טוב'
  return name ? `${greeting}, ${name}!` : `${greeting}!`
}

export default function Home() {
  useSignals()
  const stats = globalStatsSignal.value
  const name = userNameSignal.value
  const todaySessions = getTodaySessions()

  return (
    <div className="min-h-screen" style={{ background: '#fef9f0' }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #c4b8a4 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top bar */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6"
        style={{
          height: 52,
          background: '#1c1c2e',
          borderBottom: '2px solid #1c1c2e',
          boxShadow: '0 2px 0 #10b981',
        }}
      >
        <div className="flex items-center gap-2">
          <span>👨‍💻</span>
          <span className="font-black text-white text-lg leading-none">Code</span>
          <span
            className="font-black text-sm px-2 py-0.5 leading-none"
            style={{
              background: '#10b981',
              color: '#fff',
              border: '2px solid #10b981',
              borderRadius: 8,
            }}
          >
            Learn
          </span>
        </div>

        <div className="flex items-center gap-4">
          {name && (
            <span className="text-sm font-bold" style={{ color: '#a0998c' }}>
              {getTimeGreeting(name)}
            </span>
          )}
          {stats.totalMax > 0 && (
            <span
              className="flex items-center gap-1 text-sm font-black px-3 py-1"
              style={{
                background: '#fef9f0',
                color: '#1c1c2e',
                border: '2px solid #10b981',
                borderRadius: 8,
              }}
            >
              ⭐ <span style={{ color: '#f59e0b' }}>{stats.totalScore}</span>/{stats.totalMax}
            </span>
          )}
          <Link
            to="/calendar"
            className="flex items-center gap-1 text-sm font-black px-3 py-1"
            style={{
              background: '#fef9f0',
              color: '#1c1c2e',
              border: '2px solid #6366f1',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            📅 לוח למידה
          </Link>
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto px-6 py-10">

        {/* Today's plan */}
        {todaySessions.length > 0 && (
          <div className="mb-8 p-4" style={{ border: '2px solid #1c1c2e', borderRadius: 14, background: '#fff', boxShadow: '4px 4px 0 #1c1c2e' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📅</span>
              <span className="font-black" style={{ color: '#1c1c2e' }}>תוכנית הלמידה שלך להיום</span>
              <div className="flex-1 h-0.5 mr-2" style={{ background: '#1c1c2e', opacity: 0.1 }} />
              <Link to="/calendar" className="text-xs font-bold" style={{ color: '#6366f1', textDecoration: 'none' }}>
                לעריכה ←
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {todaySessions.map(session => {
                const course = courses.find(c => c.id === session.courseId)
                if (!course) return null
                return (
                  <Link
                    key={session.id}
                    to={`/learn/${course.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="flex items-center gap-2 px-3 py-2"
                      style={{
                        border: `2px solid ${course.color}`,
                        borderRadius: 10,
                        background: course.color + '12',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.12s',
                        boxShadow: `2px 2px 0 ${course.color}`,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{course.emoji}</span>
                      <div>
                        <p className="font-black text-sm leading-none" style={{ color: '#1c1c2e' }}>{course.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: course.color, fontWeight: 700 }}>{session.duration} דקות</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Section title */}
        <div className="flex items-center gap-4 mb-7">
          <h2 className="font-black text-2xl" style={{ color: '#1c1c2e' }}>
            קורסים זמינים
          </h2>
          <div className="flex-1 h-0.5" style={{ background: '#1c1c2e', opacity: 0.15 }} />
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center" style={{ color: '#a0998c', fontSize: '1rem' }}>
          <p>כל הקורסים חינמיים · בנוי עם React + Signals</p>
          <p className="mt-1" style={{ fontSize: '0.85rem', color: '#c4b8a4' }}>
            © {new Date().getFullYear()} כל הזכויות שמורות ל-yizik
          </p>
        </footer>
      </div>
    </div>
  )
}
