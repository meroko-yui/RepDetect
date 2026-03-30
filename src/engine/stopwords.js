import { DEFAULT_STOPWORDS } from '../data/defaultStopwords.js';

/**
 * Filters out stopwords from a token array.
 * @param {Array} tokens - Token objects from tokenizer
 * @param {Set} [customStopwords] - Optional override; defaults to DEFAULT_STOPWORDS
 * @returns {Object} { filtered: tokens without stopwords, stopped: tokens that were stopwords }
 */
export function filterStopwords(tokens, customStopwords = DEFAULT_STOPWORDS) {
  const filtered = [];
  const stopped = [];

  for (const token of tokens) {
    if (customStopwords.has(token.word)) {
      stopped.push(token);
    } else {
      filtered.push(token);
    }
  }

  return { filtered, stopped };
}
