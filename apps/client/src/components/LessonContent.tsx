import type { ContentBlock } from '../types'
import CodeBlock from './CodeBlock'
import TableDialog from './TableDialog'

interface Props {
  blocks: ContentBlock[]
}

export default function LessonContent({ blocks }: Props) {
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={i}
                className=" font-bold text-white mt-10 mb-3 first:mt-0"
              >
                {block.text}
              </h2>
            )
          case 'text':
            return (
              <p key={i} className=" text-slate-300 leading-relaxed">
                {block.text}
              </p>
            )
          case 'tip':
            return (
              <div
                key={i}
                className="my-5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 px-5 py-4  text-indigo-200 leading-relaxed flex gap-3"
              >
                <span className=" shrink-0">💡</span>
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
