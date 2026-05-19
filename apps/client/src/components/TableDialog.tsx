import { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Props {
  headers: string[]
  rows: string[][]
  caption?: string
}

function extractTableName(caption: string): string {
  const match = caption.match(/[a-zA-Z_][a-zA-Z0-9_]*/)
  return match ? match[0] : 'my_table'
}

function inferColType(values: string[]): 'INT' | 'VARCHAR(100)' {
  return values.every((v) => /^\d+(\.\d+)?$/.test(v.trim())) ? 'INT' : 'VARCHAR(100)'
}

// function buildSQL(tableName: string, headers: string[], rows: string[][]): string {
//   const types = headers.map((_, i) => inferColType(rows.map((r) => r[i])))

//   const colDefs = headers
//     .map((h, i) => {
//       const pk = i === 0 ? ' PRIMARY KEY' : ''
//       return `  ${h} ${types[i]}${pk}`
//     })
//     .join(',\n')

//   const createSQL = `CREATE TABLE ${tableName} (\n${colDefs}\n);`

//   const valueRows = rows.map((row) => {
//     const vals = row.map((v, i) => (types[i] === 'INT' ? v : `'${v}'`))
//     return `  (${vals.join(', ')})`
//   })

//   const insertSQL = `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES\n${valueRows.join(',\n')};`

//   return `${createSQL}\n\n${insertSQL}`
// }

export default function TableDialog({ headers, rows, caption = '' }: Props) {
  const [open, setOpen] = useState(false)
  const tableName = extractTableName(caption)
  // const sql = buildSQL(tableName, headers, rows)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="my-4 w-full flex items-center gap-3 px-5 py-4 text-right brutal-card-sm"
        style={{ background: '#fff' }}
      >
        <span style={{ fontSize: '1.3rem' }}>📊</span>
        <span className="flex-1 font-bold" style={{ color: '#1c1c2e' }}>
          {caption || tableName}
        </span>
        <span
          className="font-semibold"
          style={{
            background: '#f0ece4',
            border: '1.5px solid #c4b8a4',
            borderRadius: 8,
            padding: '2px 10px',
            color: '#7a6a5a',
            fontSize: '0.85rem',
          }}
        >
          {rows.length} שורות · {headers.length} עמודות
        </span>
        <span style={{ color: '#c4b8a4', fontSize: '1.1rem' }}>←</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28,28,46,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            style={{
              background: '#fef9f0',
              border: '2px solid #1c1c2e',
              boxShadow: '6px 6px 0 #1c1c2e',
              borderRadius: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog header */}
            <div
              className="sticky top-0 flex items-center justify-between px-6 py-4 z-10"
              style={{
                background: '#1c1c2e',
                borderRadius: '18px 18px 0 0',
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '1.3rem' }}>📊</span>
                <h3 className="font-black" style={{ color: '#fff', fontSize: '1.05rem' }}>
                  {caption || tableName}
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center font-black"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '1rem',
                }}
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Table */}
              <div
                className="overflow-x-auto"
                style={{ border: '2px solid #1c1c2e', borderRadius: 12 }}
              >
                <table className="w-full" dir="ltr" style={{ fontSize: '1rem' }}>
                  <thead>
                    <tr style={{ background: '#1c1c2e' }}>
                      {headers.map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left font-black"
                          style={{
                            color: '#10b981',
                            fontFamily: "'Fira Code', Consolas, monospace",
                            borderBottom: '2px solid #333355',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 === 0 ? '#fff' : '#faf8f4',
                          borderBottom: i < rows.length - 1 ? '1px solid #e8e4dc' : 'none',
                        }}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="px-5 py-3"
                            style={{
                              color: '#3a3a50',
                              fontFamily: "'Fira Code', Consolas, monospace",
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
