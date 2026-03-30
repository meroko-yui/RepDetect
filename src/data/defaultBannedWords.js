/**
 * Default banned words — always flagged regardless of repetition.
 * These are common crutch words / weak constructions in fiction.
 */
export const DEFAULT_BANNED_WORDS = new Set([
  'suddenly',
  'very',
  'really',
  'just',
  'quite',
  'rather',
  'somewhat',
  'slightly',
  'basically',
  'literally',
  'actually',
  'practically',
]);

/**
 * Banned phrases — multi-word patterns always flagged.
 * Checked against the raw text (case-insensitive).
 */
export const DEFAULT_BANNED_PHRASES = [
  'she felt',
  'she realized',
  'he felt',
  'he realized',
  'she noticed',
  'he noticed',
  'she could see',
  'he could see',
  'she could feel',
  'he could feel',
  'she could hear',
  'he could hear',
  'it seemed',
  'it appeared',
  'began to',
  'started to',
  'managed to',
  'in order to',
];
