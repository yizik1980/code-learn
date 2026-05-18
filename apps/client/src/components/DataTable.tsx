interface Props {
  headers: string[]
  rows: string[][]
  caption?: string
}

export default function DataTable({ headers, rows, caption }: Props) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-white/10">
      {caption && (
        <div className="bg-[#1a1a28] text-slate-400 text-sm px-4 py-2 border-b border-white/10">
          {caption}
        </div>
      )}
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
              className="border-b border-white/5 hover:bg-white/3 transition-colors"
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
  )
}
