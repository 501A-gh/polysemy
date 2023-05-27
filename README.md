# This is [Polysemy](https://polysemy.vercel.app/).

Polysemy is a block based text editor for English.

## Keybindings

### Basic Navigation

| Key             | Action         |
| --------------- | -------------- |
| `tab`           | move forwards  |
| `tab` + `shift` | move backwords |

### Select Mode

| Key                  | Action                    |
| -------------------- | ------------------------- |
| `enter`              | switch to edit mode       |
| `m`                  | add a new paragraph above |
| `n`                  | add a new paragraph below |
| `del` or `backspace` | delete paragraph          |

### Edit Mode

#### Text Edits

| Key                       | Action                    | Submit             |
| ------------------------- | ------------------------- | ------------------ |
| `cmd`                     | Focus on caret            |                    |
| `cmd` + `enter`           | switch to select mode     |                    |
| `o`                       | enter command mode        | `enter` or `space` |
| `h` (start) + `h` (end)   | highlight words           | `enter` or `space` |
| `c`                       | copy word                 |                    |
| `x`                       | cut word                  |                    |
| `j`                       | delete word infront       |                    |
| `del` or `backspace`      | delete word               |                    |
| `r` or `enter` or `space` | replace a word            | `space`            |
| `i`                       | insert a sentence infront | `enter`            |

#### Table Edits

| Key              | Action                |
| ---------------- | --------------------- |
| `cmd` + `k`      | Add column            |
| `cmd` + `j`      | Add row               |
| `tab` or `enter` | Save contents in cell |
