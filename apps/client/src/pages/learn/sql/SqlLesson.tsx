import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'
import { getLessonProgress } from '../../../signals/progress'
import { sqlLessons } from '../../../data/sql/lessons'
import LessonContent from '../../../components/LessonContent'
import QuizDialog from '../../../components/QuizDialog'

export default function SqlLesson() {
  useSignals()
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()

  const lessonIdx = sqlLessons.findIndex((l) => l.id === lessonId)
  const lesson = sqlLessons[lessonIdx]
  const prevLesson = lessonIdx > 0 ? sqlLessons[lessonIdx - 1] : null
  const nextLesson = lessonIdx < sqlLessons.length - 1 ? sqlLessons[lessonIdx + 1] : null

  const prog = getLessonProgress('sql', lessonId ?? '')

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#08080f] flex items-center justify-center text-white text-2xl">
        שיעור לא נמצא
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#08080f]">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-[#08080f]/95 backdrop-blur border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/learn/sql"
            className="text-slate-400 hover:text-white transition-colors text-xl flex items-center gap-1"
          >
            → SQL
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-white font-semibold text-xl truncate flex-1">
            {lesson.emoji} {lesson.title}
          </span>
          <span className="text-slate-500 text-base shrink-0">
            {lessonIdx + 1} / {sqlLessons.length}
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Lesson header */}
        <div className="mb-10">
          <div className="text-6xl mb-4">{lesson.emoji}</div>
          <h1 className="text-4xl font-black text-white mb-3">{lesson.title}</h1>
          <p className="text-xl text-slate-400">{lesson.summary}</p>
          {prog?.completed && (
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-4 py-2 text-emerald-400 text-base">
              ✓ הושלם · {prog.score}/{prog.total} נקודות
            </div>
          )}
        </div>

        {/* Content */}
        <LessonContent blocks={lesson.content} />

        {/* Quiz */}
        <QuizDialog
          key={lesson.id}
          questions={lesson.questionBank}
          courseId="sql"
          lessonId={lesson.id}
          progress={prog}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/8">
          {prevLesson ? (
            <button
              onClick={() => navigate(`/learn/sql/${prevLesson.id}`)}
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center group-hover:bg-white/12 transition-all text-xl">
                →
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600">שיעור קודם</div>
                <div className="text-lg font-medium">{prevLesson.title}</div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              onClick={() => navigate(`/learn/sql/${nextLesson.id}`)}
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
            >
              <div className="text-left">
                <div className="text-sm text-slate-600">שיעור הבא</div>
                <div className="text-lg font-medium">{nextLesson.title}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-all text-xl text-emerald-400">
                ←
              </div>
            </button>
          ) : (
            <button
              onClick={() => navigate('/learn/sql')}
              className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              <div className="text-left">
                <div className="text-sm text-emerald-600">סיימת את הקורס!</div>
                <div className="text-lg font-medium">חזרה לסיכום</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-all text-xl">
                🏆
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
