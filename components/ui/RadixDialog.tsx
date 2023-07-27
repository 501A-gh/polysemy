import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DialogProps {
  trigger: JSX.Element;
  title: string;
  description: string;
  children: JSX.Element | JSX.Element[];
  save: JSX.Element;
}

const RadixDialog: React.FC<DialogProps> = ({
  trigger,
  title,
  description,
  children,
  save,
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay
        className={`bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0`}
      />
      <Dialog.Content
        //  data-[state=open]:animate-show
        className={`
          fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md
          bg-gray-50/50 dark:bg-gray-950/50 
          border border-gray-300/50 dark:border-gray-800 backdrop-blur
          p-6 focus:outline-none shadow-xl
        `}
      >
        <Dialog.Title className={`font-serif m-0`}>{title}</Dialog.Title>
        <Dialog.Description className={`my-4`}>
          <p>{description}</p>
        </Dialog.Description>
        {children}
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>{save}</Dialog.Close>
        </div>
        <Dialog.Close className={`btn-close`}>
          <Cross2Icon />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default RadixDialog;
