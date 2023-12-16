import {
  ClipboardIcon,
  ExternalLinkIcon,
  FontBoldIcon,
  FontItalicIcon,
  LetterCaseLowercaseIcon,
  LetterCaseUppercaseIcon,
  LinkNone2Icon,
  StrikethroughIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import LinkInsert from "../LinkInsert";
import HighlightAction, { HighlightActionItemTypes } from "../HighlightAction";
import { backspaceMultiple, copy } from "@/util/helper/globalUtilities";
import { BlockType } from "@/components/row/edit/intent/text/TextInterpreter";
import { applyLink } from "@/util/helper/globalUtilities";

const TextAction: React.FC<{
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  selectBlocks: number[];
  sentence: () => string;
  resetSelect: () => void;
}> = ({ setBlocks, selectBlocks, sentence, resetSelect }) => {
  const textActions: HighlightActionItemTypes[] = [
    {
      action: "copy",
      element: (
        <button
          className={`btn btn-standard`}
          onClick={() => {
            copy(sentence());
            resetSelect();
          }}
        >
          <ClipboardIcon />
          Copy Raw Text
        </button>
      ),
    },
    {
      action: "link",
      element: (
        <LinkInsert
          trigger={
            <button className={`btn btn-standard`}>
              <LinkNone2Icon />
              Set Link
            </button>
          }
          applyLink={(link: string) => {
            applyLink(link, selectBlocks, setBlocks, sentence());
            resetSelect();
          }}
        />
      ),
    },
    {
      action: "delete",
      element: (
        <button
          className={`btn btn-standard`}
          onClick={() => {
            backspaceMultiple(selectBlocks, setBlocks);
            resetSelect();
          }}
        >
          <TrashIcon />
          Delete
        </button>
      ),
    },
    {
      action: "bold",
      element: (
        <button className={`btn btn-standard`}>
          <FontBoldIcon />
          Bold
        </button>
      ),
    },
    {
      action: "italic",
      element: (
        <button className={`btn  btn-standard`}>
          <FontItalicIcon />
          Italic
        </button>
      ),
    },
    {
      action: "strike",
      element: (
        <button className={`btn  btn-standard`}>
          <StrikethroughIcon />
          Strike Through
        </button>
      ),
    },
    {
      action: "uppercase",
      element: (
        <button className={`btn  btn-standard`}>
          <LetterCaseUppercaseIcon />
          Uppercase
        </button>
      ),
    },
    {
      action: "lowercase",
      element: (
        <button className={`btn  btn-standard`}>
          <LetterCaseLowercaseIcon />
          Lowercase
        </button>
      ),
    },
    {
      action: "search",
      element: (
        <button className={`btn  btn-standard`}>
          <ExternalLinkIcon />
          Search New Tab
        </button>
      ),
    },
  ];

  return <HighlightAction highlightActionItems={textActions} />;
};

export default TextAction;
