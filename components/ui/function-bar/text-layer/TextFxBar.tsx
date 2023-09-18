import React from "react";
import {
  ClipboardIcon,
  Cross2Icon,
  CursorArrowIcon,
  DotsVerticalIcon,
  ExternalLinkIcon,
  FontBoldIcon,
  FontItalicIcon,
  FontStyleIcon,
  HobbyKnifeIcon,
  LetterCaseLowercaseIcon,
  LetterCaseUppercaseIcon,
  RulerHorizontalIcon,
  RulerSquareIcon,
  StrikethroughIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import RadixPopover from "../../RadixPopover";
import NlpPastTense from "../NlpPastTense";
import { copy } from "@/util/helper/globalUtilities";
import LinkInsert from "../LinkInsert";

interface TextFxBarProps {
  sentence: () => string;
  resetSelect: () => void;
  backspaceMultiple: () => void;
  applyLink: (link: string) => void;
}

const TextFxBar: React.FC<TextFxBarProps> = ({
  sentence,
  resetSelect,
  backspaceMultiple,
  applyLink,
}) => {
  return (
    <>
      <button
        autoFocus
        className={`btn btn-standard`}
        onClick={() => {
          copy(sentence());
          resetSelect();
        }}
      >
        <ClipboardIcon />
        Copy Raw Text
      </button>
      <RadixPopover
        title="Modify"
        size="small"
        trigger={
          <button className={`btn btn-standard`}>
            <HobbyKnifeIcon />
            Modify
          </button>
        }
      >
        <div className={`grid`}>
          <LinkInsert
            applyLink={(link: string) => {
              applyLink(link);
              resetSelect();
            }}
          />
          <button
            className={`btn btn-standard`}
            onClick={() => {
              backspaceMultiple();
              resetSelect();
            }}
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      </RadixPopover>
      <RadixPopover
        title="Format"
        size="small"
        trigger={
          <button className={`btn btn-standard`}>
            <RulerHorizontalIcon />
            Format
          </button>
        }
      >
        <div className={`grid`}>
          <button className={`btn btn-standard`}>
            <FontBoldIcon />
            Bold
          </button>
          <button className={`btn btn-standard`}>
            <FontItalicIcon />
            Italic
          </button>
          <button className={`btn btn-standard`}>
            <StrikethroughIcon />
            Strike Through
          </button>
          <button className={`btn btn-standard`}>
            <LetterCaseUppercaseIcon />
            Uppercase
          </button>
          <button className={`btn btn-standard`}>
            <LetterCaseLowercaseIcon />
            Lowercase
          </button>
        </div>
      </RadixPopover>
      <RadixPopover
        title="Others"
        size="small"
        trigger={
          <button className={`btn btn-standard`}>
            <DotsVerticalIcon />
          </button>
        }
      >
        <div className={`grid`}>
          <button className={`btn btn-standard`} onClick={() => resetSelect()}>
            <ExternalLinkIcon />
            Search New Tab
          </button>
          <NlpPastTense sentence={sentence()} />
        </div>
      </RadixPopover>
    </>
  );
};

export default TextFxBar;
