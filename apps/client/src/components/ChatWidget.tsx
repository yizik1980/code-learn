import { useState, useEffect, useRef, useCallback } from 'react'
import { getUserData } from '../utils/userStorage'

interface ChatMessage {
  id: string
  text: string
  userId: string
  name: string
  at: number
  direction: 'out' | 'in'
}

const apiBase = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:3001'
const WS_URL = apiBase.replace(/^http/, 'ws') + '/ws/chat'
const RECONNECT_MS = 3000

function formatTime(at: number) {
  return new Date(at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const userData = getUserData()
  const userId = userData.token.slice(0, 8)
  const userName = userData.name || 'אנונימי'

  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => setConnected(true)

    ws.onmessage = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data as string)
        if (data.type !== 'message') return
        const msg: ChatMessage = {
          id: data.id,
          text: data.text,
          userId: data.userId,
          name: data.name,
          at: data.at,
          direction: data.userId === userId ? 'out' : 'in',
        }
        setMessages((prev) => [...prev, msg])
      } catch {}
    }

    ws.onclose = () => {
      setConnected(false)
      reconnectRef.current = setTimeout(connect, RECONNECT_MS)
    }

    ws.onerror = () => ws.close()
  }, [userId])

  useEffect(() => {
    connect()
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current)
      wsRef.current?.close()
    }
  }, [connect])

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView()
      inputRef.current?.focus()
    }
  }, [open, messages.length])

  function send() {
    const text = input.trim()
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ type: 'message', text, userId, name: userName }))
    setInput('')
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  function handleClear() {
    setMessages([])
  }

  return (
    <>
      {/* Popup */}
      {open && (
        <div
          className="fixed z-50 flex flex-col"
          style={{
            bottom: 88,
            left: 24,
            width: 360,
            height: 480,
            background: '#fef9f0',
            border: '2px solid #1c1c2e',
            boxShadow: '6px 6px 0 #1c1c2e',
            borderRadius: 16,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: '#1c1c2e',
              borderRadius: '14px 14px 0 0',
              color: '#fef9f0',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <span className="font-black text-sm">צ'אט</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: connected ? '#10b981' : '#f59e0b' }}
              />
            </div>
            <button
              onClick={handleClear}
              title="נקה היסטוריה"
              className="text-xs opacity-60 hover:opacity-100"
              style={{ color: '#fef9f0' }}
            >
              נקה
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
            {messages.length === 0 && (
              <p className="text-center text-sm mt-8" style={{ color: '#a0998c' }}>
                אין הודעות עדיין — שלח משהו!
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-0.5 ${msg.direction === 'out' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-xs font-bold" style={{ color: '#5a5a72' }}>
                  {msg.direction === 'out' ? 'אתה' : msg.name}
                </span>
                <div
                  className="px-3 py-2 text-sm max-w-[85%]"
                  style={{
                    background: msg.direction === 'out' ? '#1c1c2e' : '#fff',
                    color: msg.direction === 'out' ? '#fef9f0' : '#1c1c2e',
                    border: '2px solid #1c1c2e',
                    borderRadius: msg.direction === 'out' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                    boxShadow: '2px 2px 0 #1c1c2e',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </div>
                <span className="text-xs" style={{ color: '#c4b8a4' }}>
                  {formatTime(msg.at)}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex gap-2 p-3"
            style={{ borderTop: '2px solid #e8e0d4' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={connected ? 'כתוב הודעה...' : 'מתחבר...'}
              disabled={!connected}
              maxLength={500}
              className="flex-1 px-3 py-2 text-sm font-medium"
              style={{
                background: '#fff',
                border: '2px solid #1c1c2e',
                borderRadius: 8,
                color: '#1c1c2e',
                outline: 'none',
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || !connected}
              className="px-3 py-2 font-black text-sm"
              style={{
                background: input.trim() && connected ? '#10b981' : '#c4b8a4',
                color: '#fff',
                border: '2px solid #1c1c2e',
                boxShadow: '2px 2px 0 #1c1c2e',
                borderRadius: 8,
                cursor: input.trim() && connected ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed z-50 flex items-center justify-center"
        style={{
          bottom: 24,
          left: 24,
          width: 56,
          height: 56,
          background: '#1c1c2e',
          border: '2px solid #1c1c2e',
          boxShadow: open ? '2px 2px 0 #10b981' : '4px 4px 0 #10b981',
          borderRadius: 16,
          cursor: 'pointer',
          fontSize: 26,
          transition: 'box-shadow 0.15s',
        }}
        title="פתח צ'אט"
      >
        {open ? '✕' : '💬'}
      </button>
    </>
  )
}
