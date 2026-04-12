import React, { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { cva } from 'class-variance-authority'
import { Toaster } from 'sonner'
import CommandPalette from '@/components/ui/CommandPalette'
import Editor from '@/components/ui/Editor'
import Wallpaper from '@/components/ui/Wallpaper'

const editor = cva(['border', 'transition-all'], {
  variants: {
    select: {
      true: [
        'p-1',
        'scale-95',
        'h-screen',
        'cursor-pointer',
        'select-none',
        'border-dashed',
        'border-zinc-400/50',
        'dark:border-zinc-700/50',
        'bg-zinc-50/50',
        'dark:bg-zinc-950/50',
        'rounded-md',
        'shadow-2xl',
        'backdrop-blur',
        'overflow-clip',
      ],
      false: ['bg-transparent', 'border-none'],
    },
  },
  defaultVariants: {
    select: false,
  },
})

export const Route = createFileRoute('/$slug')({
  component: EditorPage,
})

function EditorPage() {
  const { slug } = Route.useParams()
  const [cmdPalette, setCmdPalette] = useState(false)

  useEffect(() => {
    document.title = `${slug} · Polysemy`
  }, [slug])

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key.toLowerCase() === 'p') {
        setCmdPalette(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Wallpaper src={false} />
      <CommandPalette open={cmdPalette} setOpen={setCmdPalette} />
      <Toaster toastOptions={{ className: 'toast' }} />

      <section onClick={() => setCmdPalette(false)}>
        <div className={editor({ select: cmdPalette })}>
          <Editor />
        </div>
      </section>
    </>
  )
}
