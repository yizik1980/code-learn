import { useEffect } from 'react'
import { playEntranceJingle, fireEntranceConfetti } from '../utils/celebration'

export function useLessonEntrance(color: string) {
  useEffect(() => {
    const timer = setTimeout(() => {
      playEntranceJingle()
      fireEntranceConfetti(color)
    }, 120)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
