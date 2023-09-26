# This is [Polysemy](https://polysemy.vercel.app/).

Polysemy is a block based text editor for English.

## Keybindings

### Global Shortcuts

| Key             | Action               |
| --------------- | -------------------- |
| `⌘` + `⇧` + `p` | open command palette |

### Basic Navigation

| Key         | Action         |
| ----------- | -------------- |
| `tab`       | move forwards  |
| `tab` + `⇧` | move backwords |

### Select Mode

| Key                  | Action                    |
| -------------------- | ------------------------- |
| `enter`              | switch to edit mode       |
| `m`                  | add a new paragraph above |
| `n`                  | add a new paragraph below |
| `del` or `backspace` | delete paragraph          |

### Edit Mode

#### Text Edits

| Key                     | Action                    | Submit             |
| ----------------------- | ------------------------- | ------------------ |
| `⌘`                     | Focus on caret            |                    |
| `⇧` + `⌥`               | Focus on markdown intent  |                    |
| `⌘` + `enter`           | switch to select mode     |                    |
| `o`                     | enter command mode        | `enter` or `space` |
| `h` (start) + `h` (end) | highlight words           | `enter` or `space` |
| `c`                     | copy word                 |                    |
| `x`                     | cut word                  |                    |
| `del` or `backspace`    | delete word               |                    |
| `enter` or `space`      | replace a word            | `space`            |
| `/`                     | insert a sentence infront | `enter`            |

##### Text Groups

Text groups refer to paranthesis, brakets and more. (Anything that group a set of words)

| Key               | Action         | Submit  |
| ----------------- | -------------- | ------- |
| `(` or `'` or `[` | insert a group | `enter` |

#### Table Edits

| Key              | Action                |
| ---------------- | --------------------- |
| `⌘` + `k`        | Add column            |
| `⌘` + `j`        | Add row               |
| `tab` or `enter` | Save contents in cell |
