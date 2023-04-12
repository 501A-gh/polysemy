import React from 'react'

export default function Paragraph({text}:{text:string[]}) {
  return (
    <section
      className={`
        mb-2
        border-l
        border-slate-500
      `}
    >
      <p
        className={`
          p-2
          text-slate-500
        `}   
      >
        {text.map((word:string) => <span>{word} </span>)}
      </p>
    </section>
  )
}
