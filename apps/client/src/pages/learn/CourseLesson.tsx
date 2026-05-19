import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'
import { getLessonProgress } from '../../signals/progress'
import { courses } from '../../data/courses'
import LessonContent from '../../components/LessonContent'
import QuizDialog from '../../components/QuizDialog'
import LangToggle from '../../components/LangToggle'
import NoteBox from '../../components/NoteBox'

export default function CourseLesson() {
  useSignals()
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const navigate = useNavigate()

  const course = courses.find((c) => c.id === courseId)
  if (!course || course.comingSoon) return <Navigate to="/" replace />

  const lessonIdx = course.lessons.findIndex((l) => l.id === lessonId)
  const lesson = course.lessons[lessonIdx]
  const prevLesson = lessonIdx > 0 ? course.lessons[lessonIdx - 1] : null
  const nextLesson = lessonIdx < course.lessons.length - 1 ? course.lessons[lessonIdx + 1] : null

  const prog = getLessonProgress(course.id, lessonId ?? '')

  if (!lesson) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-black"
        style={{ background: '#fef9f0', color: '#1c1c2e', fontSize: '1.5rem' }}
      >
        שיעור לא נמצא
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#fef9f0' }}>
      {/* Top nav */}
      <nav
        className="sticky top-0 z-50 backdrop-blur"
        style={{
          background: 'rgba(254,249,240,0.95)',
          borderBottom: '2px solid #1c1c2e',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-3">
          <Link
            to={`/learn/${course.id}`}
            className="font-bold flex items-center gap-1 brutal-btn px-3 py-1.5"
            style={{ background: '#fff', color: '#1c1c2e', fontSize: '0.95rem' }}
          >
            → {course.emoji} {course.title}
          </Link>
          <span style={{ color: '#c4b8a4' }}>/</span>
          <span className="font-black truncate flex-1" style={{ color: '#1c1c2e', fontSize: '1rem' }}>
            {lesson.emoji} {lesson.title}
          </span>
          <span
            className="font-bold shrink-0"
            style={{
              background: '#1c1c2e',
              color: '#fef9f0',
              borderRadius: 8,
              padding: '2px 10px',
              fontSize: '0.85rem',
            }}
          >
            {lessonIdx + 1} / {course.lessons.length}
          </span>
          <LangToggle />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-6">
        {/* Lesson header */}
        <div className="mb-6">
          <div style={{ fontSize: '2.5rem' }} className="mb-2">{lesson.emoji}</div>
          <h1 className="font-black mb-1" style={{ color: '#1c1c2e', fontSize: '2rem' }}>
            {lesson.title}
          </h1>
          <p style={{ color: '#5a5a72' }}>{lesson.summary}</p>
          {prog?.completed && (
            <div
              className="mt-3 inline-flex items-center gap-2 font-bold"
              style={{
                background: '#f0fdf8',
                border: `2px solid ${course.color}`,
                boxShadow: `3px 3px 0 ${course.color}`,
                borderRadius: 10,
                padding: '4px 14px',
                color: course.color,
                fontSize: '1rem',
              }}
            >
              ✓ הושלם · {prog.score}/{prog.total} נקודות
            </div>
          )}
        </div>

        {/* Content */}
        <LessonContent blocks={lesson.content} />

        {/* Notes */}
        <NoteBox courseId={course.id} lessonId={lesson.id} color={course.color} />

        {/* Quiz */}
        <QuizDialog
          key={lesson.id}
          questions={lesson.questionBank}
          courseId={course.id}
          lessonId={lesson.id}
          progress={prog}
          color={course.color}
        />

        {/* Navigation */}
        <div
          className="flex items-center justify-between mt-8 pt-5"
          style={{ borderTop: '2px solid #e8e4dc' }}
        >
          {prevLesson ? (
            <button
              onClick={() => navigate(`/learn/${course.id}/${prevLesson.id}`)}
              className="flex items-center gap-3 brutal-btn px-4 py-2"
              style={{ background: '#fff', color: '#1c1c2e' }}
            >
              <span style={{ fontSize: '1.2rem' }}>→</span>
              <div className="text-right">
                <div style={{ fontSize: '0.8rem', color: '#8080a0' }}>שיעור קודם</div>
                <div className="font-bold" style={{ fontSize: '0.95rem' }}>{prevLesson.title}</div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              onClick={() => navigate(`/learn/${course.id}/${nextLesson.id}`)}
              className="flex items-center gap-3 brutal-btn px-4 py-2"
              style={{ background: course.color, color: '#fff' }}
            >
              <div className="text-left">
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)' }}>שיעור הבא</div>
                <div className="font-bold" style={{ fontSize: '0.95rem' }}>{nextLesson.title}</div>
              </div>
              <span style={{ fontSize: '1.2rem' }}>←</span>
            </button>
          ) : (
            <button
              onClick={() => navigate(`/learn/${course.id}`)}
              className="flex items-center gap-3 brutal-btn px-4 py-2"
              style={{ background: '#f59e0b', color: '#1c1c2e' }}
            >
              <div className="text-left">
                <div style={{ fontSize: '0.8rem', color: '#7a6a30' }}>סיימת את הקורס!</div>
                <div className="font-bold" style={{ fontSize: '0.95rem' }}>חזרה לסיכום</div>
              </div>
              <span style={{ fontSize: '1.5rem' }}>🏆</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
