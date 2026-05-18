import type { ContentBlock } from '../types'
import CodeBlock from './CodeBlock'
import TableDialog from './TableDialog'

interface Props {
  blocks: ContentBlock[]
}

export default function LessonContent({ blocks }: Props) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={i}
                className="font-black mt-8 mb-2 first:mt-0"
                style={{ color: '#1c1c2e', fontSize: '1.4rem' }}
              >
                {block.text}
              </h2>
            )
          case 'text':
            return (
              <p key={i} className="leading-relaxed" style={{ color: '#3a3a50' }}>
                {block.text}
              </p>
            )
          case 'tip':
            return (
              <div
                key={i}
                className="my-4 flex gap-3 leading-relaxed"
                style={{
                  background: '#fffbeb',
                  border: '2px solid #f59e0b',
                  boxShadow: '3px 3px 0 #f59e0b',
                  borderRadius: 12,
                  padding: '14px 18px',
                  color: '#7a5a10',
                }}
              >
                <span className="shrink-0" style={{ fontSize: '1.2rem' }}>💡</span>
                <span>{block.text}</span>
              </div>
            )
          case 'code':
            return (
              <CodeBlock
                key={i}
                code={block.code ?? ''}
                lang={block.lang ?? 'sql'}
                caption={block.caption}
              />
            )
          case 'table':
            return (
              <TableDialog
                key={i}
                headers={block.headers ?? []}
                rows={block.rows ?? []}
                caption={block.caption}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
