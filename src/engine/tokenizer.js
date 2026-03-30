/**
 * Tokenizes text into word tokens with position tracking.
 * Preserves original casing and character offsets for highlight mapping.
 *
 * Handles straight apostrophes ('), curly quotes (\u2018\u2019), and hyphens
 * so contractions like "couldn't" stay as one token.
 */
export function tokenize(text) {
  const tokens = [];
  // Include straight apostrophe ('), curly quotes (\u2018 \u2019), and hyphens inside words
  const regex = /[a-zA-Z][a-zA-Z\u2018\u2019'\-]*/g;
  let match;
  let wordIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    const original = match[0];
    // Strip trailing apostrophes/hyphens (e.g. end-of-word possessive after quote)
    const cleaned = original.replace(/[\u2018\u2019'\-]+$/, '');
    if (cleaned.length === 0) continue;

    // Normalize curly quotes to straight apostrophe for matching
    const word = cleaned.toLowerCase().replace(/[\u2018\u2019]/g, "'");

    tokens.push({
      index: wordIndex,
      word,
      original: cleaned,
      charStart: match.index,
      charEnd: match.index + cleaned.length,
    });
    wordIndex++;
  }

  return tokens;
}
