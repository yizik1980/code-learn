import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CourseIndex from './pages/learn/CourseIndex'
import CourseLesson from './pages/learn/CourseLesson'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn/:courseId" element={<CourseIndex />} />
        <Route path="/learn/:courseId/:lessonId" element={<CourseLesson />} />
      </Routes>
    </BrowserRouter>
  )
}
