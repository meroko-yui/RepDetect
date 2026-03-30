import { tokenize } from './tokenizer.js';
import { filterStopwords } from './stopwords.js';
import { addStems } from './stemmer.js';
import { detectRepetitions } from './repetitionDetector.js';
import { checkBannedWords, checkBannedPhrases } from './bannedWords.js';

/**
 * Main analysis orchestrator.
 *
 * @param {string} text - Raw input text
 * @param {Object} [options]
 * @param {number} [options.window=100] - Proximity window in words
 * @param {Set}    [options.stopwords] - Custom stopwords (uses default if omitted)
 * @param {Set}    [options.bannedWords] - Custom banned words
 * @param {string[]} [options.bannedPhrases] - Custom banned phrases
 * @returns {Object} Full analysis result
 */
export function analyze(text, options = {}) {
  const { window = 100, stopwords, bannedWords, bannedPhrases } = options;

  // 1. Tokenize
  const allTokens = tokenize(text);

  // 2. Filter stopwords
  const { filtered: contentTokens } = filterStopwords(allTokens, stopwords);

  // 3. Stem
  addStems(contentTokens);

  // 4. Detect repetitions
  const { repetitions, tokenSeverities } = detectRepetitions(contentTokens, window);

  // 5. Banned words & phrases
  const bannedWordsFound = checkBannedWords(allTokens, bannedWords);
  const bannedPhrasesFound = checkBannedPhrases(text, bannedPhrases);

  // 6. Build stats
  const uniqueWords = new Set(contentTokens.map(t => t.word));
  const topRepeated = [...repetitions.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(r => ({
      stem: r.stem,
      count: r.count,
      variants: [...r.variants],
    }));

  return {
    tokens: allTokens,
    contentTokens,
    repetitions,
    tokenSeverities,
    bannedWordsFound,
    bannedPhrasesFound,
    stats: {
      wordCount: allTokens.length,
      uniqueContentWords: uniqueWords.size,
      repetitionGroups: repetitions.size,
      flaggedTokens: tokenSeverities.size,
      bannedWordsCount: bannedWordsFound.length,
      bannedPhrasesCount: bannedPhrasesFound.length,
      topRepeated,
    },
  };
}
