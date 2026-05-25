import { useEffect } from 'react'
import confetti from 'canvas-confetti'

function playJingle(color: string) {
  try {
    const ctx = new AudioContext()

    // Happy major-chord arpeggio: C5 E5 G5 C6
    const notes = [523.25, 659.25, 783.99, 1046.5]
    const durations = [0.12, 0.12, 0.12, 0.22]
    const startTimes = [0, 0.1, 0.2, 0.32]

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.value = freq

      const t = ctx.currentTime + startTimes[i]
      const dur = durations[i]

      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(t)
      osc.stop(t + dur)
    })

    // Close context after jingle ends
    setTimeout(() => ctx.close(), 800)
  } catch {
    // AudioContext not available (e.g. SSR / test)
  }
}

function fireConfetti(color: string) {
  const count = 120
  const spread = 70

  confetti({
    particleCount: count,
    angle: 60,
    spread,
    origin: { x: 0, y: 0.6 },
    colors: [color, '#f59e0b', '#fff', '#10b981', '#6366f1'],
    scalar: 0.9,
    gravity: 1.1,
    drift: 0.3,
  })

  confetti({
    particleCount: count,
    angle: 120,
    spread,
    origin: { x: 1, y: 0.6 },
    colors: [color, '#f59e0b', '#fff', '#10b981', '#6366f1'],
    scalar: 0.9,
    gravity: 1.1,
    drift: -0.3,
  })
}

export function useLessonEntrance(color: string) {
  useEffect(() => {
    const timer = setTimeout(() => {
      playJingle(color)
      fireConfetti(color)
    }, 120) // slight delay so the page renders first

    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps — fire once per lesson mount
}
