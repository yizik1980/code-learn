import { useSignals } from '@preact/signals-react/runtime'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import CourseIndex from './pages/learn/CourseIndex'
import CourseLesson from './pages/learn/CourseLesson'
import ScrollToTop from './components/ScrollToTop'
import NamePromptModal from './components/NamePromptModal'
import { userNameSignal } from './signals/userName'

export default function App() {
  useSignals()
  const [dismissed, setDismissed] = useState(false)
  const showModal = !userNameSignal.value && !dismissed

  return (
    <BrowserRouter>
      <ScrollToTop />
      {showModal && <NamePromptModal onClose={() => setDismissed(true)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn/:courseId" element={<CourseIndex />} />
        <Route path="/learn/:courseId/:lessonId" element={<CourseLesson />} />
      </Routes>
    </BrowserRouter>
  )
}
