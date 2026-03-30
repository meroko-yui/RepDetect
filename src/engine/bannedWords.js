import { DEFAULT_BANNED_WORDS, DEFAULT_BANNED_PHRASES } from '../data/defaultBannedWords.js';

/**
 * Checks tokens against the banned words list.
 * @param {Array} allTokens - ALL tokens (pre-stopword-filter), since banned words might be stopwords too
 * @param {Set} [bannedWords] - Single-word bans
 * @returns {Array} Tokens that matched banned words
 */
export function checkBannedWords(allTokens, bannedWords = DEFAULT_BANNED_WORDS) {
  return allTokens.filter(t => bannedWords.has(t.word));
}

/**
 * Finds banned phrases in the raw text.
 * @param {string} text - Original text
 * @param {string[]} [phrases] - Banned phrases to search for
 * @returns {Array} { phrase, charStart, charEnd } for each match
 */
export function checkBannedPhrases(text, phrases = DEFAULT_BANNED_PHRASES) {
  const results = [];
  const lowerText = text.toLowerCase();

  for (const phrase of phrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    let match;

    while ((match = regex.exec(text)) !== null) {
      results.push({
        phrase,
        charStart: match.index,
        charEnd: match.index + match[0].length,
      });
    }
  }

  return results;
}
