import { useSignals } from '@preact/signals-react/runtime'
import { globalStatsSignal } from '../signals/progress'
import { courses } from '../data/courses'
import CourseCard from '../components/CourseCard'

export default function Home() {
  useSignals()
  const stats = globalStatsSignal.value

  return (
    <div className="min-h-screen" style={{ background: '#fef9f0' }}>
      {/* Decorative dots background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #c4b8a4 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-14">
        {/* Header */}
        <header className="text-center mb-14">
          <div className="text-6xl mb-4">👨‍💻</div>

          <h1
            className="font-black mb-3 leading-tight"
            style={{ fontSize: '3.5rem', color: '#1c1c2e' }}
          >
            Code
            <span
              style={{
                color: '#fff',
                background: '#10b981',
                border: '2px solid #1c1c2e',
                boxShadow: '4px 4px 0 #1c1c2e',
                borderRadius: 12,
                padding: '0 12px',
                marginRight: 6,
                display: 'inline-block',
              }}
            >
              Learn
            </span>
          </h1>

          <p
            className="max-w-xl mx-auto leading-relaxed"
            style={{ color: '#5a5a72', fontSize: '1.2rem' }}
          >
            ללמוד לתכנת בצורה קלה, מהנה ועם שאלות לאורך הדרך
          </p>

          {stats.totalMax > 0 && (
            <div
              className="inline-flex items-center gap-2 mt-5 px-5 py-2 brutal-card-sm"
              style={{ fontSize: '1.1rem', color: '#1c1c2e' }}
            >
              ⭐ הצברת{' '}
              <span className="font-black" style={{ color: '#f59e0b' }}>
                {stats.totalScore}/{stats.totalMax}
              </span>{' '}
              נקודות
            </div>
          )}
        </header>

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
        </footer>
      </div>
    </div>
  )
}
