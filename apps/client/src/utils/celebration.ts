import confetti from 'canvas-confetti'

// ── Audio ─────────────────────────────────────────────────────────────────────

function playNotes(notes: { freq: number; start: number; dur: number; vol?: number }[]) {
  try {
    const ctx = new AudioContext()
    notes.forEach(({ freq, start, dur, vol = 0.18 }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = freq
      const t = ctx.currentTime + start
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(vol, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t)
      osc.stop(t + dur)
    })
    setTimeout(() => ctx.close(), notes.at(-1)!.start * 1000 + 900)
  } catch {
    // AudioContext not available
  }
}

/** Short happy arpeggio — played when entering a lesson */
export function playEntranceJingle() {
  playNotes([
    { freq: 523.25, start: 0,    dur: 0.12 }, // C5
    { freq: 659.25, start: 0.10, dur: 0.12 }, // E5
    { freq: 783.99, start: 0.20, dur: 0.12 }, // G5
    { freq: 1046.5, start: 0.32, dur: 0.22 }, // C6
  ])
}

/** Victory fanfare — played when a quiz finishes. Intensity scales with score ratio. */
export function playQuizSuccess(score: number, total: number) {
  const ratio = score / total

  if (ratio === 1) {
    // Perfect score — full triumphant fanfare
    playNotes([
      { freq: 523.25, start: 0,    dur: 0.14, vol: 0.2  }, // C5
      { freq: 659.25, start: 0.12, dur: 0.14, vol: 0.2  }, // E5
      { freq: 783.99, start: 0.24, dur: 0.14, vol: 0.2  }, // G5
      { freq: 1046.5, start: 0.36, dur: 0.14, vol: 0.22 }, // C6
      { freq: 1318.5, start: 0.48, dur: 0.30, vol: 0.22 }, // E6 — high finish
    ])
  } else if (ratio >= 0.6) {
    // Passed — shorter cheerful notes
    playNotes([
      { freq: 659.25, start: 0,    dur: 0.12, vol: 0.18 }, // E5
      { freq: 783.99, start: 0.12, dur: 0.12, vol: 0.18 }, // G5
      { freq: 1046.5, start: 0.24, dur: 0.22, vol: 0.20 }, // C6
    ])
  } else {
    // Low score — gentle two-note encouragement
    playNotes([
      { freq: 523.25, start: 0,    dur: 0.14, vol: 0.14 }, // C5
      { freq: 659.25, start: 0.16, dur: 0.20, vol: 0.14 }, // E5
    ])
  }
}

// ── Confetti ──────────────────────────────────────────────────────────────────

const PALETTE = ['#f59e0b', '#10b981', '#6366f1', '#fff', '#ec4899']

/** Dual-cannon burst — lesson entrance */
export function fireEntranceConfetti(color: string) {
  const colors = [color, ...PALETTE]
  const shared = { spread: 70, scalar: 0.9, gravity: 1.1, colors }
  confetti({ ...shared, particleCount: 120, angle: 60,  origin: { x: 0, y: 0.6 }, drift:  0.3 })
  confetti({ ...shared, particleCount: 120, angle: 120, origin: { x: 1, y: 0.6 }, drift: -0.3 })
}

/** Quiz completion confetti — intensity varies with score */
export function fireQuizConfetti(color: string, score: number, total: number) {
  const ratio = score / total
  const colors = [color, ...PALETTE]

  if (ratio === 1) {
    // Perfect: big burst + shower
    confetti({ particleCount: 180, spread: 100, origin: { x: 0.5, y: 0.5 }, colors, scalar: 1.1 })
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0, y: 0.7 }, colors })
      confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors })
    }, 250)
  } else if (ratio >= 0.6) {
    // Passed: medium burst
    confetti({ particleCount: 100, spread: 80, origin: { x: 0.5, y: 0.55 }, colors, scalar: 0.95 })
  } else {
    // Low score: gentle sprinkle from top
    confetti({ particleCount: 40, spread: 50, origin: { x: 0.5, y: 0.3 }, colors, scalar: 0.8, gravity: 1.5 })
  }
}
