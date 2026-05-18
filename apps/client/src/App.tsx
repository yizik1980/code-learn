import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SqlIndex from './pages/learn/sql/SqlIndex'
import SqlLesson from './pages/learn/sql/SqlLesson'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn/sql" element={<SqlIndex />} />
        <Route path="/learn/sql/:lessonId" element={<SqlLesson />} />
      </Routes>
    </BrowserRouter>
  )
}
