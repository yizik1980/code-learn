import { etlLessons } from './etl/lessons'
import { gisLessons } from './gis/lessons'
import { pythonLessons } from './python/lessons'
import { nosqlLessons } from './nosql/lessons'
import { sqlLessons } from './sql/lessons'
import { jsLessons } from './js/lessons'
import { tsLessons } from './ts/lessons'
import { reactLessons } from './react_course/lessons'
import { reactNativeLessons } from './react_native/lessons'
import { cloudLessons } from './cloud/lessons'
import { devopsLessons } from './devops/lessons'
import { llmLessons } from './llm/lessons'
import { csharpLessons } from './csharp/lessons'
import { testingLessons } from './testing/lessons'
import { angularLessons } from './angular/lessons'
import { patternsLessons } from './patterns/lessons'
import { cicdLessons } from './cicd/lessons'
import { electronicsLessons } from './electronics/lessons'
import { architectureLessons } from './architecture/lessons'
import { vibeCodingLessons } from './vibe_coding/lessons'
import { notebooklmLessons } from './notebooklm/lessons'
import type { Course } from '../types'

export const courses: Course[] = [
  {
    id: 'python',
    title: 'Python',
    description: 'שפת הבינה המלאכותית — משתנים, פונקציות, רשימות, קבצים ועוד',
    emoji: '🐍',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    lessons: pythonLessons,
  },
  {
    id: 'nosql',
    title: 'NoSQL & MongoDB',
    description: 'MongoDB מהבסיס — CRUD, Aggregation Pipeline, $lookup, Indexes ו-Mongoose',
    emoji: '🍃',
    color: '#16a34a',
    gradient: 'from-green-600 to-emerald-700',
    lessons: nosqlLessons,
  },
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
    id: 'react-native',
    title: 'React Native',
    description: 'בניית אפליקציות מובייל ל-iOS ו-Android עם React — מ-Hello World עד פרסום בחנות',
    emoji: '📱',
    color: '#0ea5e9',
    gradient: 'from-sky-500 to-blue-600',
    lessons: reactNativeLessons,
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
    id: 'electronics',
    title: 'יסודות האלקטרוניקה',
    description: 'מתח, זרם, חוק אוהם, מולטימטר, נגדים, קבלים, דיודות, טרנזיסטורים, סלילים וקריאת סכמות',
    emoji: '⚡',
    color: '#f59e0b',
    gradient: 'from-yellow-500 to-orange-600',
    lessons: electronicsLessons,
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    description: 'GitHub Actions, Docker ב-pipeline, Secrets, Quality Gates, Blue/Green, Canary ו-Monitoring — מ-push ועד production',
    emoji: '🚀',
    color: '#f97316',
    gradient: 'from-orange-500 to-rose-600',
    lessons: cicdLessons,
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
  {
    id: 'testing',
    title: 'Unit & Integration Tests',
    description: 'Jest, Vitest, React Testing Library, Supertest ו-xUnit — בדיקות אוטומטיות מ-unit ועד API',
    emoji: '🧪',
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-700',
    lessons: testingLessons,
  },
  {
    id: 'csharp',
    title: 'C# & .NET',
    description: 'C# 12/13, ASP.NET Core, EF Core, ביצועים ו-.NET מודרני',
    emoji: '🔷',
    color: '#512bd4',
    gradient: 'from-purple-600 to-violet-800',
    lessons: csharpLessons,
  },
  {
    id: 'angular',
    title: 'Angular',
    description: 'Framework מלא — Components, Services, Routing, Forms ו-Signals',
    emoji: '🅰️',
    color: '#dd0031',
    gradient: 'from-red-600 to-rose-700',
    lessons: angularLessons,
  },
  {
    id: 'patterns',
    title: 'SOLID & Design Patterns',
    description: 'SOLID, Creational, Structural ו-Behavioral Patterns, Event-Driven Architecture, CQRS ו-Event Sourcing',
    emoji: '🏛️',
    color: '#0891b2',
    gradient: 'from-cyan-600 to-teal-700',
    lessons: patternsLessons,
  },
  {
    id: 'architecture',
    title: 'Software Architecture',
    description: 'ארכיטקטורת תוכנה — מונוליט, מיקרוסרביסים, DDD, CQRS, Scalability ו-Security',
    emoji: '🏗️',
    color: '#0f766e',
    gradient: 'from-teal-600 to-emerald-800',
    lessons: architectureLessons,
  },
  {
    id: 'notebooklm',
    title: 'NotebookLM',
    description: 'כלי המחקר של Google — AI שמבין את המסמכים שלך, מייצר פודקאסטים, Study Guides ועוד',
    emoji: '📓',
    color: '#1a73e8',
    gradient: 'from-blue-600 to-indigo-700',
    lessons: notebooklmLessons,
  },
  {
    id: 'vibe-coding',
    title: 'Vibe Coding',
    description: 'פיתוח תוכנה עם AI — פרומפטים, workflow, debug ו-best practices לעידן ה-AI',
    emoji: '✨',
    color: '#a855f7',
    gradient: 'from-purple-500 to-pink-600',
    lessons: vibeCodingLessons,
  },
  {
    id: 'llm',
    title: 'LLM & MCP',
    description: 'חיבור מערכות קיימות ל-AI — Claude API, MCP Server, Tool Use ב-Node.js ו-C#',
    emoji: '🤖',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-700',
    lessons: llmLessons,
  },
  {
    id: 'gis',
    title: 'GIS & מפות',
    description: 'Geographic Information Systems — PostGIS, GeoPandas, Leaflet.js, ניתוח מרחבי ונתונים גיאוגרפיים של ישראל',
    emoji: '🌍',
    color: '#059669',
    gradient: 'from-emerald-600 to-green-800',
    lessons: gisLessons,
  },
  {
    id: 'etl',
    title: 'ETL & Data Warehouse',
    description: 'ארכיטקטורת DWH, Star Schema, SCD, ETL מלא, dbt, Airflow, Medallion Architecture ו-Data Quality',
    emoji: '🏛️',
    color: '#0891b2',
    gradient: 'from-cyan-600 to-blue-800',
    lessons: etlLessons,
  },
]
