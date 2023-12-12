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
import { copy } from "@/util/helper/globalUtilities";

interface TextFxBarProps {
  sentence: () => string;
  resetSelect: () => void;
  backspaceMultiple: () => void;
  applyLink: (link: string) => void;
}

const GroupAction: React.FC<TextFxBarProps> = ({
  sentence,
  resetSelect,
  backspaceMultiple,
  applyLink,
}) => {
  const groupActions: HighlightActionItemTypes[] = [
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
            applyLink(link);
            resetSelect();
          }}
        />
      ),
    },
    {
      action: "delete",
      element: (
        <button
          className={`btn  btn-standard`}
          onClick={() => {
            backspaceMultiple();
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
        <button className={`btn  btn-standard`}>
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

  return <HighlightAction highlightActionItems={groupActions} />;
};

export default GroupAction;
