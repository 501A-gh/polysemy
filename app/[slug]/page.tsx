"use client";
import React, { useEffect, useState } from "react";
import Editor from "../../components/ui/Editor";
import Wallpaper from "@/components/ui/Wallpaper";
import CommandPalette from "@/components/ui/CommandPalette";
import { cva } from "class-variance-authority";
import { Toaster } from "sonner";

const editor = cva(["border", "transition-all"], {
  variants: {
    select: {
      true: [
        "p-1",
        "scale-95",
        "h-screen",
        "cursor-pointer",
        "select-none",
        "border-dashed",
        "border-zinc-400/50",
        "dark:border-zinc-700/50",
        "bg-zinc-50/50",
        "dark:bg-zinc-950/50",
        "rounded-md",
        "shadow-2xl",
        "backdrop-blur",
        "overflow-clip",
      ],
      false: ["bg-transparent", "border-none"],
    },
  },
  defaultVariants: {
    select: false,
  },
});

export default function EditorPage() {
  const [cmdPalette, setCmdPalette] = useState(false);
  useEffect(() => {
    const down = (e: any) => {
      if (e.metaKey && e.shiftKey && e.key === "p") setCmdPalette(true);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Wallpaper
        src={
          false
          // "https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
        }
      />
      <CommandPalette open={cmdPalette} setOpen={setCmdPalette} />
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      {/* {!cmdPalette && <Header />} */}
      <section onClick={() => setCmdPalette(false)}>
        <div className={editor({ select: cmdPalette })}>
          <Editor />
        </div>
      </section>
    </>
  );
}
