import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CourseIndex from './pages/learn/CourseIndex'
import CourseLesson from './pages/learn/CourseLesson'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn/:courseId" element={<CourseIndex />} />
        <Route path="/learn/:courseId/:lessonId" element={<CourseLesson />} />
      </Routes>
    </BrowserRouter>
  )
}
