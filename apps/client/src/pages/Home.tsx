import { useSignals } from '@preact/signals-react/runtime'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { globalStatsSignal } from '../signals/progress'
import { userNameSignal } from '../signals/userName'
import { courses } from '@codelearn/courses-data'
import CourseCard from '../components/CourseCard'

interface TodaySession { id: string; courseId: string; duration: 10 | 20 | 30 }
interface TodayTask { id: string; title: string; done: boolean }

const TODAY_KEY = (() => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})()

function getTodaySessions(): TodaySession[] {
  try {
    const schedule = JSON.parse(localStorage.getItem('cl_schedule') ?? '{}') as Record<string, TodaySession[]>
    return schedule[TODAY_KEY] ?? []
  } catch { return [] }
}

function getTodayTasks(): TodayTask[] {
  try {
    const tasks = JSON.parse(localStorage.getItem('cl_tasks') ?? '{}') as Record<string, TodayTask[]>
    return tasks[TODAY_KEY] ?? []
  } catch { return [] }
}

function saveToday(tasks: TodayTask[]) {
  try {
    const all = JSON.parse(localStorage.getItem('cl_tasks') ?? '{}') as Record<string, TodayTask[]>
    all[TODAY_KEY] = tasks
    localStorage.setItem('cl_tasks', JSON.stringify(all))
  } catch {}
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
  const [tasks, setTasks] = useState<TodayTask[]>(getTodayTasks)
  const [search, setSearch] = useState('')

  function toggleTask(id: string) {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    setTasks(updated)
    saveToday(updated)
  }
  const filteredCourses = search.trim()
    ? courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.description.includes(search))
    : courses

  return (
    <div className="min-h-screen" style={{ background: '#fef9f0' }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #c4b8a4 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Sticky header block */}
      {/* Skip to content — נגישות */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:px-4 focus:py-2 focus:font-black focus:rounded-lg"
        style={{ background: '#10b981', color: '#fff' }}
      >
        דלג לתוכן הראשי
      </a>

      <div className="sticky top-0 z-40" style={{ background: '#1c1c2e', boxShadow: '0 2px 0 #10b981' }}>

        {/* שורה 1: לוגו + כפתורים */}
        <div className="flex items-center justify-between px-4 md:px-6" style={{ height: 52 }}>
          <div className="flex items-center gap-2">
            <span>👨‍💻</span>
            <span className="font-black text-white text-lg leading-none">Code</span>
            <span className="font-black text-sm px-2 py-0.5 leading-none" style={{ background: '#10b981', color: '#fff', borderRadius: 8 }}>
              Learn
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search — desktop only */}
            <div className="relative items-center hidden md:flex">
              <span className="absolute" style={{ right: 10, color: '#5a5a72', fontSize: 14, pointerEvents: 'none' }}>🔍</span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="חיפוש קורס..."
                aria-label="חיפוש קורסים"
                className="text-sm font-bold"
                style={{ paddingRight: 32, paddingLeft: 10, paddingTop: 5, paddingBottom: 5, background: '#2d2d40', color: '#fef9f0', border: '2px solid #3d3d54', borderRadius: 8, outline: 'none', width: 180 }}
              />
              {search && (
                <button onClick={() => setSearch('')} aria-label="נקה חיפוש" style={{ position: 'absolute', left: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#a0998c', fontSize: 16, lineHeight: 1 }}>×</button>
              )}
            </div>

            {/* Greeting + stats — desktop only */}
            {name && (
              <span className="hidden md:inline text-sm font-bold" style={{ color: '#a0998c' }}>{getTimeGreeting(name)}</span>
            )}
            {stats.totalMax > 0 && (
              <span className="hidden md:flex items-center gap-1 text-sm font-black px-3 py-1" style={{ background: '#fef9f0', color: '#1c1c2e', border: '2px solid #10b981', borderRadius: 8 }}>
                ⭐ <span style={{ color: '#f59e0b' }}>{stats.totalScore}</span>/{stats.totalMax}
              </span>
            )}

            {/* Calendar — אייקון במובייל, טקסט בדסקטופ */}
            <Link
              to="/calendar"
              className="flex items-center gap-1 font-black px-3 py-1.5 text-sm"
              style={{ background: '#fef9f0', color: '#1c1c2e', border: '2px solid #6366f1', borderRadius: 8, textDecoration: 'none' }}
            >
              <span>📅</span>
              <span className="hidden md:inline">לוח למידה</span>
            </Link>
          </div>
        </div>

        {/* שורה 2: ברכה + ניקוד — מובייל בלבד */}
        {(name || stats.totalMax > 0) && (
          <div className="flex md:hidden items-center justify-between px-4 pb-2 gap-3">
            {name && (
              <span className="text-sm font-bold" style={{ color: '#a0998c' }}>{getTimeGreeting(name)}</span>
            )}
            {stats.totalMax > 0 && (
              <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1" style={{ background: '#fef9f0', color: '#1c1c2e', border: '2px solid #10b981', borderRadius: 8 }}>
                ⭐ <span style={{ color: '#f59e0b' }}>{stats.totalScore}</span>/{stats.totalMax}
              </span>
            )}
          </div>
        )}

        {/* שורה 3: חיפוש — מובייל בלבד */}
        <div className="flex md:hidden px-4 pb-3">
          <div className="relative flex items-center w-full">
            <span className="absolute" style={{ right: 10, color: '#5a5a72', fontSize: 14, pointerEvents: 'none' }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="חיפוש קורס..."
              className="text-sm font-bold w-full"
              style={{ paddingRight: 32, paddingLeft: search ? 32 : 10, paddingTop: 8, paddingBottom: 8, background: '#2d2d40', color: '#fef9f0', border: '2px solid #3d3d54', borderRadius: 8, outline: 'none' }}
            />
            {search && (
              <button onClick={() => setSearch('')} aria-label="נקה חיפוש" style={{ position: 'absolute', left: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#a0998c', fontSize: 18, lineHeight: 1 }}>×</button>
            )}
          </div>
        </div>

      </div>{/* end sticky block */}

      <div id="main-content" className="relative max-w-5xl mx-auto px-6 py-10">

        {/* Today's plan */}
        {(todaySessions.length > 0 || tasks.length > 0) && (
          <div className="mb-8 p-4" style={{ border: '2px solid #1c1c2e', borderRadius: 14, background: '#fff', boxShadow: '4px 4px 0 #1c1c2e' }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📋</span>
              <span className="font-black" style={{ color: '#1c1c2e' }}>היום שלי</span>
              <div className="flex-1 h-0.5 mr-2" style={{ background: '#1c1c2e', opacity: 0.1 }} />
              <Link to="/calendar" className="text-xs font-bold" style={{ color: '#6366f1', textDecoration: 'none' }}>
                ללוח ←
              </Link>
            </div>

            <div className={`grid gap-4 ${todaySessions.length > 0 && tasks.length > 0 ? 'md:grid-cols-2' : ''}`}>
              {/* קורסים */}
              {todaySessions.length > 0 && (
                <div>
                  <p className="text-xs font-black mb-2" style={{ color: '#5a5a72', letterSpacing: '0.05em' }}>קורסים להיום</p>
                  <div className="flex flex-col gap-2">
                    {todaySessions.map(session => {
                      const course = courses.find(c => c.id === session.courseId)
                      if (!course) return null
                      return (
                        <Link key={session.id} to={`/learn/${course.id}`} style={{ textDecoration: 'none' }}>
                          <div className="flex items-center gap-2 px-3 py-2" style={{ border: `2px solid ${course.color}`, borderRadius: 10, background: course.color + '12', boxShadow: `2px 2px 0 ${course.color}` }}>
                            <span style={{ fontSize: 18 }}>{course.emoji}</span>
                            <div className="flex-1">
                              <p className="font-black text-sm leading-none" style={{ color: '#1c1c2e' }}>{course.title}</p>
                              <p className="text-xs mt-0.5 font-bold" style={{ color: course.color }}>{session.duration} דקות</p>
                            </div>
                            <span className="text-xs" style={{ color: '#a0998c' }}>←</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* משימות */}
              {tasks.length > 0 && (
                <div>
                  <p className="text-xs font-black mb-2" style={{ color: '#5a5a72', letterSpacing: '0.05em' }}>
                    משימות להיום · {tasks.filter(t => t.done).length}/{tasks.length} הושלמו
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {tasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center gap-2 px-3 py-2 w-full text-right"
                        style={{ border: '2px solid #e8e0d4', borderRadius: 8, background: task.done ? '#f4f0e8' : '#fff', cursor: 'pointer', transition: 'all 0.1s' }}
                      >
                        <span
                          style={{
                            width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                            border: `2px solid ${task.done ? '#10b981' : '#c4b8a4'}`,
                            background: task.done ? '#10b981' : '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: 11,
                          }}
                        >{task.done ? '✓' : ''}</span>
                        <span className="flex-1 text-sm font-bold text-right" style={{ color: task.done ? '#a0998c' : '#1c1c2e', textDecoration: task.done ? 'line-through' : 'none' }}>
                          {task.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
          {filteredCourses.length > 0
            ? filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
            : (
              <p className="col-span-3 text-center py-12 font-bold" style={{ color: '#a0998c' }}>
                לא נמצאו קורסים עבור "{search}"
              </p>
            )
          }
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
