import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { courses } from '../data/courses'

const STORAGE_KEY = 'cl_schedule'
const TASKS_KEY = 'cl_tasks'

interface Task { id: string; title: string; done: boolean }
type TaskMap = Record<string, Task[]>

function loadTaskMap(): TaskMap {
  try { return JSON.parse(localStorage.getItem(TASKS_KEY) ?? '{}') }
  catch { return {} }
}
function saveTaskMap(m: TaskMap) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(m))
}

type Duration = 10 | 20 | 30

interface Session {
  id: string
  courseId: string
  duration: Duration
}

type Schedule = Record<string, Session[]>

interface DragState {
  courseId: string
  duration: Duration
  sessionId?: string
  fromDateKey?: string
}

const DURATIONS: Duration[] = [10, 20, 30]

const MONTH_HE = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
]

const DAY_HEADERS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

function toKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// מספר → אות עברית (א׳–ל׳), עם טו/טז כנהוג
const HEB_NUMS = [
  '', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
  'יא', 'יב', 'יג', 'יד', 'טו', 'טז', 'יז', 'יח', 'יט', 'כ',
  'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט', 'ל',
]

function hebDay(d: Date): string {
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-hebrew', { day: 'numeric' }).formatToParts(d)
    const n = parseInt(parts.find(p => p.type === 'day')?.value ?? '0')
    const letters = HEB_NUMS[n] ?? String(n)
    return letters + '׳'
  } catch { return '' }
}

function hebMonthYear(d: Date) {
  try { return new Intl.DateTimeFormat('he-u-ca-hebrew', { month: 'long', year: 'numeric' }).format(d) }
  catch { return '' }
}

function buildGrid(year: number, month: number): (Date | null)[][] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)

  const gridStart = new Date(first)
  gridStart.setDate(gridStart.getDate() - gridStart.getDay()) // back to Sunday

  const gridEnd = new Date(last)
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay())) // forward to Saturday

  const weeks: (Date | null)[][] = []
  const cur = new Date(gridStart)

  while (cur <= gridEnd) {
    const week: (Date | null)[] = []
    for (let i = 0; i < 7; i++) {
      week.push(cur.getMonth() === month ? new Date(cur) : null)
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

function load(): Schedule {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') }
  catch { return {} }
}

function save(s: Schedule) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

export default function CalendarPage() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [schedule, setSchedule] = useState<Schedule>(load)
  const [duration, setDuration] = useState<Duration>(20)
  const dragRef = useRef<DragState | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)
  const [confirmDrop, setConfirmDrop] = useState<{ key: string; drag: DragState } | null>(null)
  const [showRecur, setShowRecur] = useState(false)
  const [recurUntil, setRecurUntil] = useState('')
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [mobileSelected, setMobileSelected] = useState<{ courseId: string; duration: Duration } | null>(null)
  const [taskMap, setTaskMap] = useState<TaskMap>(loadTaskMap)
  const [addingTaskKey, setAddingTaskKey] = useState<string | null>(null)
  const [taskInput, setTaskInput] = useState('')
  const [tooltipId, setTooltipId] = useState<string | null>(null)
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  const grid = buildGrid(year, month)
  const todayKey = toKey(now)
  const firstOfMonth = new Date(year, month, 1)

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  function drop(key: string) {
    const drag = dragRef.current
    if (!drag) return
    setDropTarget(null)
    dragRef.current = null

    if (drag.fromDateKey) {
      // הזזת סשן קיים — ללא שאלה, פשוט מזיז
      setSchedule(prev => {
        const next: Schedule = JSON.parse(JSON.stringify(prev))
        next[drag.fromDateKey!] = (next[drag.fromDateKey!] ?? []).filter(s => s.id !== drag.sessionId)
        if (!next[drag.fromDateKey!].length) delete next[drag.fromDateKey!]
        next[key] = [...(next[key] ?? []), { id: drag.sessionId!, courseId: drag.courseId, duration: drag.duration }]
        save(next)
        return next
      })
    } else {
      // סשן חדש מהסרגל — מציג שאלת חזרה שבועית
      setConfirmDrop({ key, drag })
      setShowRecur(false)
      setRecurUntil('')
    }
  }

  function applyDrop(isRecurring: boolean) {
    if (!confirmDrop) return
    const { key, drag } = confirmDrop
    const until = isRecurring ? recurUntil : null

    setSchedule(prev => {
      const next: Schedule = JSON.parse(JSON.stringify(prev))

      const addAt = (dateKey: string) => {
        next[dateKey] = [...(next[dateKey] ?? []), { id: crypto.randomUUID(), courseId: drag.courseId, duration: drag.duration }]
      }

      if (!until) {
        addAt(key)
      } else {
        const cur = new Date(key + 'T00:00:00')
        const end = new Date(until + 'T00:00:00')
        while (cur <= end) {
          addAt(toKey(cur))
          cur.setDate(cur.getDate() + 7)
        }
      }

      save(next)
      return next
    })

    setConfirmDrop(null)
    setShowRecur(false)
    setRecurUntil('')
  }

  function handleDayClick(key: string) {
    if (!isMobile || !mobileSelected) return
    setConfirmDrop({ key, drag: { courseId: mobileSelected.courseId, duration: mobileSelected.duration } })
    setShowRecur(false)
    setRecurUntil('')
    setMobileSelected(null)
  }

  function removeSession(key: string, id: string) {
    setSchedule(prev => {
      const next = { ...prev, [key]: (prev[key] ?? []).filter(s => s.id !== id) }
      if (!next[key].length) delete next[key]
      save(next)
      return next
    })
  }

  function addTask(key: string) {
    const title = taskInput.trim()
    if (!title) return
    setTaskMap(prev => {
      const next = { ...prev, [key]: [...(prev[key] ?? []), { id: crypto.randomUUID(), title, done: false }] }
      saveTaskMap(next)
      return next
    })
    setTaskInput('')
    setAddingTaskKey(null)
  }

  function toggleTask(key: string, taskId: string) {
    setTaskMap(prev => {
      const next = { ...prev, [key]: (prev[key] ?? []).map(t => t.id === taskId ? { ...t, done: !t.done } : t) }
      saveTaskMap(next)
      return next
    })
  }

  function removeTask(key: string, taskId: string) {
    setTaskMap(prev => {
      const next = { ...prev, [key]: (prev[key] ?? []).filter(t => t.id !== taskId) }
      if (!next[key].length) delete next[key]
      saveTaskMap(next)
      return next
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fef9f0', direction: 'rtl' }}>

      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6"
        style={{ height: 52, background: '#1c1c2e', boxShadow: '0 2px 0 #10b981', position: 'sticky', top: 0, zIndex: 40 }}
      >
        <div className="flex items-center gap-2">
          <span>👨‍💻</span>
          <span className="font-black text-white text-lg">Code</span>
          <span className="font-black text-sm px-2 py-0.5" style={{ background: '#10b981', color: '#fff', borderRadius: 8 }}>Learn</span>
        </div>
        <Link to="/" className="text-sm font-bold flex items-center gap-1" style={{ color: '#a0998c' }}>
          חזרה לקורסים ←
        </Link>
      </header>

      <div className="flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 52px)' }}>

        {/* Calendar — ראשון במובייל */}
        <main className="flex-1 p-3 md:p-5 overflow-auto order-1 md:order-2">

          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="font-black px-3 py-1.5"
              style={{ border: '2px solid #1c1c2e', borderRadius: 8, background: '#fff', cursor: 'pointer', boxShadow: '2px 2px 0 #1c1c2e', fontSize: 14 }}
            >
              › הקודם
            </button>
            <div className="text-center">
              <p className="font-black text-xl" style={{ color: '#1c1c2e' }}>{MONTH_HE[month]} {year}</p>
              <p className="text-xs mt-0.5" style={{ color: '#5a5a72' }}>{hebMonthYear(firstOfMonth)}</p>
            </div>
            <button
              onClick={nextMonth}
              className="font-black px-3 py-1.5"
              style={{ border: '2px solid #1c1c2e', borderRadius: 8, background: '#fff', cursor: 'pointer', boxShadow: '2px 2px 0 #1c1c2e', fontSize: 14 }}
            >
              הבא ‹
            </button>
          </div>

          {/* Mobile: banner קורס נבחר */}
          {isMobile && mobileSelected && (() => {
            const c = courses.find(x => x.id === mobileSelected.courseId)
            return c ? (
              <div className="flex items-center gap-2 mb-3 px-3 py-2" style={{ border: `2px solid ${c.color}`, borderRadius: 10, background: c.color + '14' }}>
                <span style={{ fontSize: 18 }}>{c.emoji}</span>
                <p className="text-sm font-black flex-1" style={{ color: '#1c1c2e' }}>
                  {c.title} · {mobileSelected.duration}′ — בחר יום בלוח
                </p>
                <button onClick={() => setMobileSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0998c', fontSize: 18 }}>×</button>
              </div>
            ) : null
          })()}

          {/* Grid */}
          <div style={{ border: '2px solid #1c1c2e', borderRadius: 12, overflow: 'hidden', boxShadow: '4px 4px 0 #1c1c2e' }}>

            {/* Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {DAY_HEADERS.map((name, i) => (
                <div
                  key={name}
                  className="text-center py-2 text-xs font-black"
                  style={{
                    background: i === 6 ? '#fef3c7' : '#1c1c2e',
                    color: i === 6 ? '#92400e' : '#e0f7ee',
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : undefined,
                  }}
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {grid.map((week, wi) => (
              <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderTop: '1px solid #e8e0d4' }}>
                {week.map((day, di) => {
                  const key = day ? toKey(day) : null
                  const isToday = key === todayKey
                  const isShabbat = di === 6
                  const isDropping = key !== null && key === dropTarget
                  const sessions: Session[] = key ? (schedule[key] ?? []) : []
                  const tasks: Task[] = key ? (taskMap[key] ?? []) : []

                  return (
                    <div
                      key={di}
                      onDragOver={!isMobile && key ? (e) => { e.preventDefault(); setDropTarget(key) } : undefined}
                      onDragLeave={!isMobile ? () => setDropTarget(null) : undefined}
                      onDrop={!isMobile && key ? () => drop(key) : undefined}
                      onClick={isMobile && key ? () => handleDayClick(key) : undefined}
                      style={{
                        minHeight: 88,
                        borderLeft: di > 0 ? '1px solid #e8e0d4' : undefined,
                        background: !day
                          ? '#f4f0e8'
                          : isDropping
                          ? '#dcfce7'
                          : isShabbat
                          ? '#fffbeb'
                          : '#fff',
                        padding: '4px 3px',
                        transition: 'background 0.1s',
                        position: 'relative',
                      }}
                    >
                      {day && (
                        <>
                          {/* Day number row */}
                          <div className="flex items-start justify-between mb-1">
                            <span
                              className="flex items-center justify-center font-black"
                              style={{
                                width: 22, height: 22, borderRadius: '50%', fontSize: 11,
                                background: isToday ? '#1c1c2e' : 'transparent',
                                color: isToday ? '#10b981' : isShabbat ? '#92400e' : '#1c1c2e',
                              }}
                            >
                              {day.getDate()}
                            </span>
                            <span style={{ fontSize: 9, color: '#b0a898', lineHeight: '22px' }}>
                              {hebDay(day)}
                            </span>
                          </div>

                          {/* Sessions */}
                          <div className="flex flex-col gap-0.5">
                            {sessions.map(session => {
                              const course = courses.find(c => c.id === session.courseId)
                              if (!course) return null
                              return (
                                <div
                                  key={session.id}
                                  draggable
                                  onDragStart={(e) => {
                                    e.stopPropagation()
                                    dragRef.current = {
                                      courseId: session.courseId,
                                      duration: session.duration,
                                      sessionId: session.id,
                                      fromDateKey: key!,
                                    }
                                  }}
                                  className="flex items-center gap-1 group"
                                  style={{
                                    padding: '2px 4px',
                                    borderRadius: 4,
                                    border: `1.5px solid ${course.color}`,
                                    background: course.color + '18',
                                    cursor: 'grab',
                                    fontSize: 10,
                                  }}
                                >
                                  <span style={{ fontSize: 9 }}>{course.emoji}</span>
                                  <span className="font-bold flex-1 truncate" style={{ color: '#1c1c2e' }}>
                                    {course.title}
                                  </span>
                                  <span style={{ color: course.color, fontWeight: 900, fontSize: 9, flexShrink: 0 }}>
                                    {session.duration}′
                                  </span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); removeSession(key!, session.id) }}
                                    className="opacity-0 group-hover:opacity-100"
                                    style={{
                                      background: 'none', border: 'none', cursor: 'pointer',
                                      color: '#ef4444', padding: 0, lineHeight: 1, fontSize: 12, flexShrink: 0,
                                    }}
                                  >
                                    ×
                                  </button>
                                </div>
                              )
                            })}
                          </div>

                          {/* משימות */}
                          {tasks.length > 0 && (
                            <div className="flex flex-col gap-0.5 mt-0.5">
                              {tasks.map(task => (
                                <div key={task.id} className="flex items-center gap-0.5 group" style={{ fontSize: 9 }}>
                                  <button
                                    onClick={e => { e.stopPropagation(); toggleTask(key!, task.id) }}
                                    style={{ width: 11, height: 11, borderRadius: 3, border: `1.5px solid ${task.done ? '#10b981' : '#c4b8a4'}`, background: task.done ? '#10b981' : '#fff', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 7 }}
                                  >{task.done ? '✓' : ''}</button>
                                  <span className="flex-1 truncate" style={{ color: task.done ? '#a0998c' : '#1c1c2e', textDecoration: task.done ? 'line-through' : 'none', fontWeight: 600 }}>{task.title}</span>
                                  <button onClick={e => { e.stopPropagation(); removeTask(key!, task.id) }} className="opacity-0 group-hover:opacity-100" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 0, lineHeight: 1, fontSize: 10, flexShrink: 0 }}>×</button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* כפתור הוספת משימה */}
                          {addingTaskKey === key ? (
                            <input
                              autoFocus
                              value={taskInput}
                              onChange={e => setTaskInput(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); addTask(key!) } if (e.key === 'Escape') { setAddingTaskKey(null); setTaskInput('') } }}
                              onBlur={() => { if (taskInput.trim()) addTask(key!); else { setAddingTaskKey(null); setTaskInput('') } }}
                              placeholder="משימה..."
                              className="w-full mt-1"
                              style={{ fontSize: 9, border: '1.5px solid #6366f1', borderRadius: 4, padding: '2px 4px', outline: 'none', background: '#fff' }}
                            />
                          ) : (
                            <button
                              onClick={e => { e.stopPropagation(); setAddingTaskKey(key); setTaskInput('') }}
                              className="w-full mt-1 opacity-0 hover:opacity-100 group-hover:opacity-60"
                              style={{ fontSize: 9, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right', padding: '1px 0', fontWeight: 700 }}
                            >
                              + משימה
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <p className="text-center mt-3 text-xs" style={{ color: '#c4b8a4' }}>
            {isMobile
              ? 'בחר קורס למטה, לאחר מכן בחר יום בלוח · לחיצה ארוכה על סשן → × למחיקה'
              : 'גרור קורס מהסרגל אל יום בלוח · גרור סשן קיים להזזה · ריחוף → × למחיקה'}
          </p>
        </main>

        {/* Sidebar / Panel קורסים */}
        <aside
          className="order-2 md:order-1 flex-shrink-0"
          style={{
            width: isMobile ? '100%' : 210,
            background: '#fff',
            borderLeft: isMobile ? 'none' : '2px solid #e8e0d4',
            borderTop: isMobile ? '2px solid #e8e0d4' : 'none',
          }}
        >
          {/* Duration */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <p className="font-black text-xs flex-shrink-0" style={{ color: '#5a5a72' }}>משך:</p>
            <div className="flex gap-1.5">
              {DURATIONS.map(d => (
                <button
                  key={d}
                  onClick={() => {
                    setDuration(d)
                    if (mobileSelected) setMobileSelected({ ...mobileSelected, duration: d })
                  }}
                  style={{
                    width: 44, padding: '5px 0', borderRadius: 8, fontSize: 12, fontWeight: 900, cursor: 'pointer',
                    border: '2px solid #1c1c2e',
                    background: duration === d ? '#1c1c2e' : '#fff',
                    color: duration === d ? '#10b981' : '#1c1c2e',
                    transition: 'all 0.12s',
                  }}
                >
                  {d}′
                </button>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div
            className={isMobile ? 'flex overflow-x-auto gap-2 px-4 pb-4' : 'flex flex-col gap-2 p-4'}
            style={isMobile ? { scrollbarWidth: 'none' } : {}}
          >
            {!isMobile && (
              <p className="font-black text-xs mb-1" style={{ color: '#5a5a72' }}>גרור קורס ←</p>
            )}
            {courses.map(course => {
              const isSelected = mobileSelected?.courseId === course.id
              const showTip = tooltipId === course.id

              return isMobile ? (
                // מובייל — אייקון בלבד + tooltip
                <div
                  key={course.id}
                  className="relative flex-shrink-0"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  {/* Tooltip */}
                  {showTip && (
                    <div style={{
                      position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                      background: '#1c1c2e', color: '#fef9f0', borderRadius: 6, padding: '4px 10px',
                      fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', zIndex: 50,
                      pointerEvents: 'none', boxShadow: '2px 2px 0 #10b981',
                    }}>
                      {course.title}
                      <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', borderWidth: 5, borderStyle: 'solid', borderColor: '#1c1c2e transparent transparent transparent' }} />
                    </div>
                  )}
                  <div
                    onClick={() => setMobileSelected(isSelected ? null : { courseId: course.id, duration })}
                    onMouseEnter={() => { if (tooltipTimer.current) clearTimeout(tooltipTimer.current); setTooltipId(course.id) }}
                    onMouseLeave={() => { tooltipTimer.current = setTimeout(() => setTooltipId(null), 300) }}
                    onTouchStart={() => { if (tooltipTimer.current) clearTimeout(tooltipTimer.current); setTooltipId(course.id); tooltipTimer.current = setTimeout(() => setTooltipId(null), 1500) }}
                    className="select-none flex items-center justify-center"
                    style={{
                      width: 44, height: 44, borderRadius: 10, fontSize: 22,
                      border: `2px solid ${isSelected ? course.color : '#e8e0d4'}`,
                      borderBottomWidth: isSelected ? 2 : 4,
                      borderBottomColor: course.color,
                      background: isSelected ? course.color + '18' : '#fef9f0',
                      cursor: 'pointer',
                      boxShadow: isSelected ? `2px 2px 0 ${course.color}` : 'none',
                      transition: 'all 0.1s',
                    }}
                  >
                    {course.emoji}
                  </div>
                </div>
              ) : (
                // דסקטופ — אייקון + שם
                <div
                  key={course.id}
                  draggable
                  onDragStart={() => { dragRef.current = { courseId: course.id, duration } }}
                  className="flex items-center gap-2 px-2 py-2 select-none"
                  style={{
                    border: `2px solid ${isSelected ? course.color : '#e8e0d4'}`,
                    borderRightWidth: 4, borderRightColor: course.color,
                    borderRadius: 8, background: '#fef9f0', cursor: 'grab',
                    transition: 'box-shadow 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `2px 2px 0 ${course.color}`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <span style={{ fontSize: 16 }}>{course.emoji}</span>
                  <span className="text-xs font-bold" style={{ color: '#1c1c2e' }}>{course.title}</span>
                </div>
              )
            })}
          </div>
        </aside>
      </div>

      {/* מודל חזרה שבועית */}
      {confirmDrop && (() => {
        const course = courses.find(c => c.id === confirmDrop.drag.courseId)
        const dropDate = new Date(confirmDrop.key + 'T00:00:00')
        const minUntil = toKey(new Date(dropDate.getTime() + 7 * 86400000))
        return (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => { setConfirmDrop(null); setShowRecur(false); setRecurUntil('') }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{ background: '#fef9f0', border: '2px solid #1c1c2e', borderRadius: 16, boxShadow: '6px 6px 0 #1c1c2e', padding: 28, width: 340, direction: 'rtl' }}
            >
              {/* כותרת + קורס */}
              <p className="font-black text-base mb-3" style={{ color: '#1c1c2e' }}>נקבע סשן למידה 🎯</p>
              {course && (
                <div className="flex items-center gap-2 mb-4 px-3 py-2" style={{ border: `2px solid ${course.color}`, borderRadius: 10, background: course.color + '14' }}>
                  <span style={{ fontSize: 20 }}>{course.emoji}</span>
                  <div className="flex-1">
                    <p className="font-black text-sm" style={{ color: '#1c1c2e' }}>{course.title}</p>
                    <p className="text-xs font-bold" style={{ color: course.color }}>{confirmDrop.drag.duration} דקות</p>
                  </div>
                  <p className="text-xs font-bold" style={{ color: '#5a5a72' }}>
                    {dropDate.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
              )}

              <p className="text-sm font-bold mb-4" style={{ color: '#5a5a72' }}>
                האם תרצה ללמוד כל שבוע, עד תאריך שתבחר?
              </p>

              {/* כפתור — פעם אחת */}
              <button
                onClick={() => applyDrop(false)}
                className="w-full font-black py-2.5 mb-2"
                style={{ border: '2px solid #1c1c2e', borderRadius: 10, background: '#fff', cursor: 'pointer', color: '#1c1c2e', boxShadow: '2px 2px 0 #1c1c2e', transition: 'all 0.1s' }}
              >
                פעם אחת בלבד
              </button>

              {/* כפתור — כל שבוע */}
              {!showRecur ? (
                <button
                  onClick={() => setShowRecur(true)}
                  className="w-full font-black py-2.5"
                  style={{ border: '2px solid #10b981', borderRadius: 10, background: '#10b981', cursor: 'pointer', color: '#fff', boxShadow: '2px 2px 0 #1c1c2e', transition: 'all 0.1s' }}
                >
                  כל שבוע עד תאריך שאבחר ✓
                </button>
              ) : (
                <div style={{ border: '2px solid #10b981', borderRadius: 10, padding: 12, background: '#f0fdf9' }}>
                  <p className="text-xs font-black mb-2" style={{ color: '#059669' }}>בחר תאריך סיום:</p>
                  <input
                    type="date"
                    min={minUntil}
                    value={recurUntil}
                    onChange={e => setRecurUntil(e.target.value)}
                    style={{ width: '100%', border: '2px solid #1c1c2e', borderRadius: 8, padding: '6px 10px', fontSize: 14, background: '#fff', marginBottom: 10, direction: 'ltr' }}
                  />
                  <button
                    onClick={() => applyDrop(true)}
                    disabled={!recurUntil}
                    className="w-full font-black py-2"
                    style={{
                      border: '2px solid #1c1c2e', borderRadius: 8, cursor: recurUntil ? 'pointer' : 'not-allowed',
                      background: recurUntil ? '#1c1c2e' : '#c4b8a4', color: recurUntil ? '#10b981' : '#fff',
                      boxShadow: recurUntil ? '2px 2px 0 #10b981' : 'none', transition: 'all 0.1s',
                    }}
                  >
                    קבע חזרה שבועית
                  </button>
                </div>
              )}

              <button
                onClick={() => { setConfirmDrop(null); setShowRecur(false); setRecurUntil('') }}
                className="w-full mt-3 text-xs font-bold py-1"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0998c' }}
              >
                ביטול
              </button>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
