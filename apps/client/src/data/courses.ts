import { sqlLessons } from './sql/lessons'
import { jsLessons } from './js/lessons'
import { tsLessons } from './ts/lessons'
import { reactLessons } from './react_course/lessons'
import { cloudLessons } from './cloud/lessons'
import { devopsLessons } from './devops/lessons'
import type { Course } from '../types'

export const courses: Course[] = [
  {
    id: 'sql',
    title: 'SQL',
    description: 'שפת השאילתות הסטנדרטית לניהול מסדי נתונים',
    emoji: '🗄️',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    lessons: sqlLessons,
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'שפת האינטרנט — משתנים, פונקציות, DOM ו-Async',
    emoji: '⚡',
    color: '#f59e0b',
    gradient: 'from-yellow-400 to-orange-500',
    lessons: jsLessons,
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript עם טיפוסים — לקוד בטוח ומקצועי יותר',
    emoji: '🔷',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    lessons: tsLessons,
  },
  {
    id: 'react',
    title: 'React',
    description: 'ספריית UI הכי פופולרית — קומפוננטות, hooks ו-state',
    emoji: '⚛️',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    lessons: reactLessons,
  },
  {
    id: 'python',
    title: 'Python',
    description: 'שפת תכנות רב-תכליתית — מדעי נתונים, ווב ואוטומציה',
    emoji: '🐍',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-600',
    lessons: [],
    comingSoon: true,
  },
  {
    id: 'cloud',
    title: 'תחזוק בענן',
    description: 'AWS, Azure ו-GCP — ניהול תשתית, שירותים ו-DevOps בענן',
    emoji: '☁️',
    color: '#0ea5e9',
    gradient: 'from-sky-400 to-blue-600',
    lessons: cloudLessons,
  },
  {
    id: 'devops',
    title: 'Linux & DevOps',
    description: 'Linux, Docker, CI/CD וניטור — מהקמנד-ליין ועד production',
    emoji: '🐧',
    color: '#f97316',
    gradient: 'from-orange-500 to-red-600',
    lessons: devopsLessons,
  },
]
