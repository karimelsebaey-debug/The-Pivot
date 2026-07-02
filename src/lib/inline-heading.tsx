import type { CSSProperties } from 'react'

export const italicHeadingStyle: CSSProperties = { fontFamily: 'var(--font-display)', fontStyle: 'italic' }

export function renderInlineHeading(text: string) {
  return text.split(/\*(.+?)\*/g).map((part, i) =>
    i % 2 === 1 ? <em key={i} style={italicHeadingStyle}>{part}</em> : part
  )
}
