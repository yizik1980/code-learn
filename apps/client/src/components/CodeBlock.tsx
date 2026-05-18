import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Props {
  code: string
  lang?: string
  caption?: string
}

export default function CodeBlock({ code, lang = 'sql', caption }: Props) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border border-white/10">
      {caption && (
        <div className="bg-[#1e2433] text-slate-400 text-base px-4 py-2 border-b border-white/10 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block" />
          <span className="mr-2">{caption}</span>
        </div>
      )}
      <div dir="ltr">
        <SyntaxHighlighter
          language={lang}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '1.25rem 1.5rem',
            fontSize: '1.05rem',
            lineHeight: '1.75',
            background: '#0d1117',
            fontFamily: "'Fira Code', Consolas, monospace",
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
