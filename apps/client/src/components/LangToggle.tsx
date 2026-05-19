import { useSignals } from '@preact/signals-react/runtime'
import { langSignal, setLang } from '../signals/lang'

export default function LangToggle() {
  useSignals()
  const lang = langSignal.value
  const isHe = lang === 'he'

  return (
    <button
      onClick={() => setLang(isHe ? 'en' : 'he')}
      className="brutal-btn px-3 py-1.5 font-black"
      style={{
        background: '#fff',
        color: '#1c1c2e',
        fontSize: '0.9rem',
        letterSpacing: '0.05em',
      }}
      title={isHe ? 'Switch to English' : 'עבור לעברית'}
    >
      {isHe ? 'EN' : 'עב'}
    </button>
  )
}
