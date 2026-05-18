import { useSignals } from '@preact/signals-react/runtime'
import { globalStatsSignal } from '../signals/progress'
import { courses } from '../data/courses'
import CourseCard from '../components/CourseCard'

export default function Home() {
  useSignals()
  const stats = globalStatsSignal.value

  return (
    <div className="min-h-screen bg-[#08080f]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="text-6xl mb-5">👨‍💻</div>
          <h1 className="text-6xl font-black text-white mb-4 leading-tight">
            Code
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-cyan-400">
              Learn
            </span>
          </h1>
          <p className="text-2xl text-slate-400 max-w-xl mx-auto leading-relaxed">
            ללמוד לתכנת בצורה קלה, מהנה ועם שאלות לאורך הדרך
          </p>

          {stats.totalMax > 0 && (
            <div className="inline-flex items-center gap-2 mt-6 bg-white/6 border border-white/10 rounded-full px-5 py-2 text-lg text-slate-300">
              ⭐ הצברת{' '}
              <span className="font-bold text-yellow-400">
                {stats.totalScore}/{stats.totalMax}
              </span>{' '}
              נקודות
            </div>
          )}
        </header>

        {/* Section title */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-white">קורסים זמינים</h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-600 text-base">
          <p>כל הקורסים חינמיים · בנוי עם React + Signals</p>
        </footer>
      </div>
    </div>
  )
}
