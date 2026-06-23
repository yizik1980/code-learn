import { useEffect, useState } from 'react'

const VISIBLE_MS = 2000
const FADE_MS    = 500

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), VISIBLE_MS)
    const doneTimer = setTimeout(onDone, VISIBLE_MS + FADE_MS)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: '#0f172a',
        transition:      `opacity ${FADE_MS}ms ease`,
        opacity:         fading ? 0 : 1,
        pointerEvents:   fading ? 'none' : 'auto',
      }}
    >
      <img
        src="/splash.png"
        alt="CodeLearn"
        style={{
          maxWidth:  '90vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: '1rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  )
}
