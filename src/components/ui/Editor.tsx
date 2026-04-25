"use client";
import Row from "@/components/row/Row";
import type { IntentIdType } from "@/util/data/rowIntentDict";
import { useEffect, useState } from "react";
import NoSpaceScroll from "./NoScrollSpace";
import { notify } from "./notify/Notify";

export interface StackType {
  intentId: IntentIdType;
  data: {
    text: string;
    link: string;
    image: string;
    quote: StackType[];
    table: string[][];
    list: StackType[];
    code: string;
    math: string;
    hr: "---";
  };
}

const Editor = () => {
  const [stack, setStack] = useState<StackType[]>([
    {
      intentId: "p",
      data: {
        text: "Welcome to Polysemy.",
        link: "",
        image: "",
        quote: [],
        table: [["Title"], ["Data"]],
        list: [],
        code: "",
        math: "",
        hr: "---",
      },
    },
  ]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && e.metaKey) notify("Saved", "action");

      const isArrowKey =
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown";

      if (!isArrowKey) return;

      const target = e.target as HTMLElement | null;
      if (target instanceof HTMLInputElement) {
        const isAtEnd = target.selectionStart === target.value.length;
        const isAtStart = target.selectionStart === 0;
        if ((e.key === "ArrowRight" && !isAtEnd) || (e.key === "ArrowLeft" && !isAtStart)) {
          return;
        }
      } else if (target instanceof HTMLTextAreaElement) {
        const isAtEnd = target.selectionStart === target.value.length;
        const isAtStart = target.selectionStart === 0;
        if ((e.key === "ArrowRight" && !isAtEnd) || (e.key === "ArrowLeft" && !isAtStart)) {
          return;
        }
      } else if (target?.isContentEditable) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const isAtEnd = !range.commonAncestorContainer.nextSibling;
          const isAtStart = !range.commonAncestorContainer.previousSibling;
          if ((e.key === "ArrowRight" && !isAtEnd) || (e.key === "ArrowLeft" && !isAtStart)) {
            return;
          }
        }
      }

      const blocks = Array.from(
        document.querySelectorAll<HTMLButtonElement>('[data-editor-block="true"]')
      );
      const caretInput = document.querySelector<HTMLInputElement>('[data-editor-caret="true"]');
      const goBackward = e.key === "ArrowLeft" || e.key === "ArrowUp";

      if (blocks.length === 0) return;

      const activeIndex = blocks.findIndex((block) => block === document.activeElement);

      if (activeIndex === -1) {
        if (!target) return;

        const previousBlock = [...blocks]
          .reverse()
          .find(
            (block) =>
              block.compareDocumentPosition(target) &
              Node.DOCUMENT_POSITION_FOLLOWING
          );
        const nextBlock = blocks.find(
          (block) =>
            block.compareDocumentPosition(target) &
            Node.DOCUMENT_POSITION_PRECEDING
        );

        if (goBackward && previousBlock) {
          e.preventDefault();
          previousBlock.focus();
        } else if (!goBackward && nextBlock) {
          e.preventDefault();
          nextBlock.focus();
        }
        return;
      }

      const nextIndex = goBackward
        ? Math.max(0, activeIndex - 1)
        : Math.min(blocks.length - 1, activeIndex + 1);

      if (nextIndex === activeIndex) {
        if (!goBackward && activeIndex === blocks.length - 1 && caretInput) {
          e.preventDefault();
          caretInput.focus();
        }
        return;
      }

      e.preventDefault();
      blocks[nextIndex].focus();
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <section className={`flex flex-col h-auto p-4 gap-2 print:pt-1`}>
        {stack.map((_, i) => (
          <Row key={i} rowIndex={i} stack={stack} setStack={setStack} />
        ))}
      </section>
      <NoSpaceScroll />
    </>
  );
};

export default Editor;
