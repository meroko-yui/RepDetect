import { stemmer } from 'stemmer';

/**
 * Adds a `stem` property to each token using the Porter Stemmer.
 * @param {Array} tokens - Token objects (must have .word)
 * @returns {Array} Same tokens with .stem added
 */
export function addStems(tokens) {
  for (const token of tokens) {
    token.stem = stemmer(token.word.replace(/'\w+$/, ''));
  }
  return tokens;
}
