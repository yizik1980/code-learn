import { useSignals } from '@preact/signals-react/runtime'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Home from './pages/Home'
import CalendarPage from './pages/Calendar'
import CourseIndex from './pages/learn/CourseIndex'
import CourseLesson from './pages/learn/CourseLesson'
import ScrollToTop from './components/ScrollToTop'
import NamePromptModal from './components/NamePromptModal'
import ChatWidget from './components/ChatWidget'
import SplashScreen from './components/SplashScreen'
import { userNameSignal } from './signals/userName'

export default function App() {
  useSignals()
  const [splash, setSplash]       = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const showModal = !userNameSignal.value && !dismissed

  const handleSplashDone = useCallback(() => setSplash(false), [])

  if (splash) return <SplashScreen onDone={handleSplashDone} />

  return (
    <BrowserRouter>
      <ScrollToTop />
      {showModal && <NamePromptModal onClose={() => setDismissed(true)} />}
      <ChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/learn/:courseId" element={<CourseIndex />} />
        <Route path="/learn/:courseId/:lessonId" element={<CourseLesson />} />
      </Routes>
    </BrowserRouter>
  )
}
