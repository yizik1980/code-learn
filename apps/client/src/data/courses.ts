import { sqlLessons } from './sql/lessons'
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
    id: 'javascript',
    title: 'JavaScript',
    description: 'שפת האינטרנט — לבניית אתרים ואפליקציות',
    emoji: '⚡',
    color: '#f59e0b',
    gradient: 'from-yellow-400 to-orange-500',
    lessons: [],
    comingSoon: true,
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript עם טיפוסים — לקוד בטוח ומקצועי יותר',
    emoji: '🔷',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    lessons: [],
    comingSoon: true,
  },
  {
    id: 'react',
    title: 'React',
    description: 'ספריית UI הכי פופולרית לבניית ממשקים',
    emoji: '⚛️',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    lessons: [],
    comingSoon: true,
  },
]
