# RepDetect

A client-side repetition detector for fiction writers. Paste your text, and RepDetect highlights repeated words by proximity with color-coded severity, suggests synonyms via Datamuse, and flags banned words — all without your text ever leaving the browser.

## Features

- **Proximity-based repetition detection** — flags words repeated within a configurable window (10-200 words) using Porter Stemmer to group morphological variants (*watched*, *watching*, *watches*)
- **Severity highlighting** — red (< 20 words apart), orange (< 50), yellow (< 100)
- **Synonym suggestions** — click any flagged word to get synonyms from the [Datamuse API](https://www.datamuse.com/api/) (direct synonyms + semantically similar words), click to copy
- **Banned words** — always-on flags for words you want to avoid (e.g. *suddenly*, *very*, *really*)
- **Stopword filtering** — common English words (articles, pronouns, prepositions, contractions) are ignored during analysis
- **Stats panel** — word count, unique content words, top repeated stems

## Privacy

**Your text never leaves your browser.** All analysis runs client-side. The only network requests are single-word queries to the Datamuse API when you click a word for synonyms.

## Stack

React 19 + Vite + Tailwind CSS. No backend, no database.

## Getting started

```bash
npm install
npm run dev
```

## How it works

1. **Tokenize** — splits text into word tokens preserving positions and handling contractions/possessives
2. **Filter stopwords** — removes ~200 common English words and contractions
3. **Stem** — reduces each remaining word to its root (Porter Stemmer)
4. **Detect** — finds repeated stems within the proximity window and assigns severity by distance
5. **Banned words** — scans all tokens against a configurable banned-words list

## License

MIT
