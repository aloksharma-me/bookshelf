# Activity Log — Kindle Book Notes

A chronological record of the Cowork tasks I ran to turn Kindle highlights into linked markdown notes. Timestamps marked **(exact)** come from file modification times; timestamps marked **(relative)** are ordered from session history but the source files live in other folders, so I don't have exact clock times for them.

---

## 1. Don't Call It Art — Austin Kleon

*Session: "Kindle highlights extraction" · before Jun 28, 2026 ~11:28 (relative)*

This is where the whole workflow started.

- Logged into the Kindle Cloud Reader (read.amazon.com/notebook) and opened *Don't Call It Art: 10 Ways to Create Like a Kid Again* by Austin Kleon.
- Extracted all **75 highlights** (locations 103–747) and saved them as a bullet-point markdown note, each bullet tagged with its Kindle location.
- **Edit:** reformatted the file to remove the "(Location xxx)" markers, leaving clean bullets.
- Created four backlinked companion notes, each named with the note context + book title, all `[[wikilinked]]` to the main note and listed back in it:
  - **Quotes** — 17 quotes with the person attributed.
  - **Bibliography** — referenced books (*The Element*, *Big Magic*, *The Extended Mind*, *Art & Fear*), *Citizen Kane*, plus thinkers and concepts.
  - **Words** — 12 notable terms (meatspace, brainbound, third places, play deficit, etc.).
  - **Ideas** — 11 threads for further research.
- Flagged two attributions ("Murray" → Bill Murray, "Evans" → Walker Evans) as context-based guesses.
- **Built the `kindle-book-notes` skill** capturing this entire workflow, and packaged it as an installable `.skill` file.

---

## 2. Articulating Design Decisions — Tom Greever

*Session: "Articulating Design Decisions notes" · Jun 28, 2026, 11:28–11:44 (exact)*

Applied the workflow to a much larger book.

- Extracted all **549 highlights** from *Articulating Design Decisions* by Tom Greever using the browser's JavaScript tool.
- Wrote the primary note with all 549 highlights as bullets, then verified the bullet count matched exactly.
- Created the four companion notes *(Jun 28, 11:28–11:29)*:
  - **Quotes** — 7 attributed quotations *(11:28)*.
  - **Bibliography** — referenced people, companies, frameworks (Jeff Atwood/Coding Horror, Interplay, Disney, Parkinson's Law, the IDEAL framework) *(11:28)*.
  - **Words** — ~16 notable terms and coinages with definitions *(11:28)*.
  - **Ideas** — 13 ideas with concrete next steps *(11:29)*.
- Normalized Kindle smart quotes/dashes to plain ASCII; flagged one inferred attribution (Tina Fey's *Bossypants*).
- **Chapter split** *(Jun 28, 11:44)*: divided the main note into **11 per-chapter notes** in a new `Chapters/` folder (main note left intact). Each chapter note got a backlink, a prose summary on top, section sub-headings promoted to `###` H3, and highlights as bullets underneath. Verified coverage: 11 chapter titles + 178 H3 sub-headings + 360 bullets = 549.
- Updated the `kindle-book-notes` skill text to document the optional chapter-split step (provided the SKILL.md edits to paste in, since skills can't be edited from the session).

---

## 3. Rafa: My Story — Rafael Nadal & John Carlin

*Session: "Rafa book highlights" · between Jun 28 ~11:44 and Jun 29 ~02:16 (relative)*

Full workflow, including the chapter split, in one pass.

- Searched the Kindle library, identified the correct edition (*Rafa: My Story* by Rafael Nadal & John Carlin, not *The Warrior*), and extracted all **56 highlights** (locations 49–3,134).
- Noticed Chapter 7's marker wasn't highlighted; ran a web search to confirm its title ("Mind Over Matter") and placed the orphaned highlight there by theme — flagged in both the primary and chapter notes.
- Wrote the primary note plus the four companions (**Quotes, Bibliography, Words, Ideas**) and a `Chapters/` subfolder with one note per chapter (1–9), all cross-linked.
- Faithfulness check passed: 43 bullets + 5 sub-headings + 8 highlighted chapter markers = 56.

---

## 4. Articulating Design Decisions — formatting pass

*Session: "Articulating Design Decisions formatting" · Jun 29, 2026, 02:16–02:23 (exact)*

Two refinements to the existing Articulating Design Decisions notes.

- **Heading hierarchy from the real TOC** *(main note rewritten Jun 29, 02:16)*: opened the actual Kindle reader (ASIN B08FVV7PDN), pulled the book's Table of Contents, and reformatted the primary note so the structure matches the book. Chapter names became `##`, the 45 section titles that appear in the TOC became `###`, and the 133 sub-sections not in the TOC became `#####`, with `---` dividers between chapters. Used official chapter names instead of the old `[ 1 ]` notation. Verified: 360 bullets + 45 headings + 133 sub-headings + 11 chapters = 549.
- **Obsidian summary callouts** *(11 chapter notes rewritten Jun 29, 02:22–02:23)*: converted each chapter note's single-line `**Summary:**` into an Obsidian `> [!Summary]` callout that renders as a titled callout box in preview mode and as blockquote syntax in markdown mode.

---

## Summary of outputs

- **3 books processed:** Don't Call It Art (75 highlights), Articulating Design Decisions (549), Rafa: My Story (56).
- **Per book:** 1 primary note + 4 companion notes (Quotes, Bibliography, Words, Ideas), all backlinked.
- **2 books** additionally split into per-chapter notes in a `Chapters/` folder.
- **1 reusable skill** created: `kindle-book-notes`, later extended with the chapter-split step.

*Log generated Jun 29, 2026.*
