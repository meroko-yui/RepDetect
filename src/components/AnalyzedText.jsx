import { useMemo } from 'react';

/**
 * Renders the original text with highlighted repetitions and banned words/phrases.
 * Each highlighted word is clickable → triggers onWordClick(word, stem).
 */
export default function AnalyzedText({ text, result, onWordClick, selectedStem }) {
  const segments = useMemo(() => {
    return buildSegments(text, result);
  }, [text, result]);

  return (
    <div className="text-sm leading-7 text-zinc-300 whitespace-pre-wrap font-[inherit]">
      {segments.map((seg, i) => {
        if (seg.type === 'text') {
          return <span key={i}>{seg.content}</span>;
        }

        if (seg.type === 'repetition') {
          const isSelected = selectedStem && seg.stem === selectedStem;
          return (
            <mark
              key={i}
              data-severity={seg.severity}
              className={isSelected ? 'ring-1 ring-zinc-300' : ''}
              onClick={() => onWordClick(seg.word, seg.stem)}
              title={`"${seg.word}" — ${seg.severity} severity (${seg.stem} family)`}
            >
              {seg.content}
            </mark>
          );
        }

        if (seg.type === 'banned-word') {
          return (
            <mark
              key={i}
              data-banned=""
              onClick={() => onWordClick(seg.word, null)}
              title={`Banned word: "${seg.word}"`}
            >
              {seg.content}
            </mark>
          );
        }

        if (seg.type === 'banned-phrase') {
          return (
            <mark
              key={i}
              data-banned=""
              title={`Banned phrase: "${seg.phrase}"`}
            >
              {seg.content}
            </mark>
          );
        }

        return <span key={i}>{seg.content}</span>;
      })}
    </div>
  );
}

/**
 * Builds a flat array of segments from the text, annotating character ranges
 * that correspond to repetitions or banned words/phrases.
 */
function buildSegments(text, result) {
  if (!result) return [{ type: 'text', content: text }];

  // Collect all marked ranges
  const marks = [];

  // Repetition tokens
  for (const token of result.contentTokens) {
    const severity = result.tokenSeverities.get(token.index);
    if (severity) {
      marks.push({
        start: token.charStart,
        end: token.charEnd,
        type: 'repetition',
        severity: severity.label,
        word: token.word,
        stem: token.stem,
      });
    }
  }

  // Banned single words
  for (const bw of result.bannedWordsFound) {
    marks.push({
      start: bw.charStart,
      end: bw.charEnd,
      type: 'banned-word',
      word: bw.word,
    });
  }

  // Banned phrases
  for (const bp of result.bannedPhrasesFound) {
    marks.push({
      start: bp.charStart,
      end: bp.charEnd,
      type: 'banned-phrase',
      phrase: bp.phrase,
    });
  }

  // Sort by start position, longer marks first for overlaps
  marks.sort((a, b) => a.start - b.start || b.end - a.end);

  // Remove overlapping marks (keep the first/higher-priority one)
  const filtered = [];
  let lastEnd = -1;
  for (const mark of marks) {
    if (mark.start >= lastEnd) {
      filtered.push(mark);
      lastEnd = mark.end;
    }
  }

  // Build segments
  const segments = [];
  let cursor = 0;

  for (const mark of filtered) {
    if (mark.start > cursor) {
      segments.push({ type: 'text', content: text.slice(cursor, mark.start) });
    }

    segments.push({
      ...mark,
      content: text.slice(mark.start, mark.end),
    });
    cursor = mark.end;
  }

  if (cursor < text.length) {
    segments.push({ type: 'text', content: text.slice(cursor) });
  }

  return segments;
}
