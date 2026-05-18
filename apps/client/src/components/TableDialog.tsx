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

function buildSQL(tableName: string, headers: string[], rows: string[][]): string {
  const types = headers.map((_, i) => inferColType(rows.map((r) => r[i])))

  const colDefs = headers
    .map((h, i) => {
      const pk = i === 0 ? ' PRIMARY KEY' : ''
      return `  ${h} ${types[i]}${pk}`
    })
    .join(',\n')

  const createSQL = `CREATE TABLE ${tableName} (\n${colDefs}\n);`

  const valueRows = rows.map((row) => {
    const vals = row.map((v, i) => (types[i] === 'INT' ? v : `'${v}'`))
    return `  (${vals.join(', ')})`
  })

  const insertSQL = `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES\n${valueRows.join(',\n')};`

  return `${createSQL}\n\n${insertSQL}`
}

export default function TableDialog({ headers, rows, caption = '' }: Props) {
  const [open, setOpen] = useState(false)
  const tableName = extractTableName(caption)
  const sql = buildSQL(tableName, headers, rows)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="my-4 w-full flex items-center gap-3 px-5 py-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/7 hover:border-emerald-500/40 transition-all group text-right"
      >
        <span className="">📊</span>
        <span className="flex-1  text-slate-300 group-hover:text-white transition-colors">
          {caption || tableName}
        </span>
        <span className="text-sm text-slate-500 bg-white/8 px-3 py-1 rounded-full">
          {rows.length} שורות · {headers.length} עמודות
        </span>
        <span className="text-slate-500 group-hover:text-emerald-400 transition-colors text-lg">←</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#111118] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-white/12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog header */}
            <div className="sticky top-0 bg-[#111118] flex items-center justify-between px-6 py-4 border-b border-white/10 z-10">
              <div className="flex items-center gap-3">
                <span className="">📊</span>
                <h3 className=" font-bold text-white">{caption || tableName}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-all text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-lg" dir="ltr">
                  <thead>
                    <tr className="bg-[#1e2433]">
                      {headers.map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-emerald-400 font-mono font-semibold border-b border-white/10"
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
                        className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                      >
                        {row.map((cell, j) => (
                          <td key={j} className="px-5 py-3 text-slate-300 font-mono">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SQL section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-slate-300">SQL ליצירת הטבלה</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10" dir="ltr">
                  <SyntaxHighlighter
                    language="sql"
                    style={atomOneDark}
                    customStyle={{
                      margin: 0,
                      padding: '1.25rem 1.5rem',
                      fontSize: '1rem',
                      lineHeight: '1.75',
                      background: '#0d1117',
                      fontFamily: "'Fira Code', Consolas, monospace",
                    }}
                  >
                    {sql}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
