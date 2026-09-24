# bookshelf
Books notes and highlights from books I've read

Plain HTML, CSS and JavaScript — no build step, no dependencies. The pages read the markdown in `Books/` directly in the browser.

## What's where

| File | What it does |
|---|---|
| `index.html` | The shelf (homepage) |
| `books.html` | The index — every book in a searchable table |
| `book.html?id=…` | One book's details |
| `notes.html?id=…` | One book's highlights |
| `css/style.css` | All styling (colours and fonts are at the top) |
| `js/catalogue.js` | **The list of books — the file you edit** |
| `js/parser.js` | Turns the markdown notes into highlights and chapters |
| `js/library.js` | Fetches the notes files |
| `js/ui.js` | Shared bits: light/dark toggle, covers, formatting |
| `js/home.js`, `list.js`, `book.js`, `notes.js` | One script per page |

## Run it locally

Browsers won't let a page opened by double-clicking read other files, so serve the folder instead. From this folder:

```bash
python3 -m http.server
```

Then open http://localhost:8000. Edits show up on refresh. (VS Code's "Live Server" extension works too.)

## Add a book

1. Put its notes in `Books/` — one `.md` file, or a folder.
2. Add an entry to `js/catalogue.js`:

```js
{ title: 'Deep Work', author: 'Cal Newport', category: 'mind', src: 'Deep Work/Deep Work.md' },
```

For a folder with one file per chapter, point `src` at the index page that links to them (`[[Chapter One]]`, …) and add `index: true`. File names must match those links exactly, including capital letters — the live server is case-sensitive.

## Publish on Vercel

Import the GitHub repo at vercel.com → **Add New → Project**. Leave every setting on its default (framework preset **Other**, no build command) and deploy. Every push to `main` redeploys.

## When something looks wrong

Open the browser's developer console. Problems are logged with a `[bookshelf]` prefix, naming the book and the file that couldn't be loaded — usually a typo in `src`, or a chapter link that doesn't match its file name.
