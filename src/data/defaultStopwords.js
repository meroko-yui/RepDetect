/**
 * Default English stopwords — common words ignored during repetition analysis.
 * Tuned for fiction: includes pronouns, articles, prepositions, common verbs.
 */
export const DEFAULT_STOPWORDS = new Set([
  // Articles & determiners
  'a', 'an', 'the', 'this', 'that', 'these', 'those',
  // Pronouns
  'i', 'me', 'my', 'mine', 'myself',
  'you', 'your', 'yours', 'yourself',
  'he', 'him', 'his', 'himself',
  'she', 'her', 'hers', 'herself',
  'it', 'its', 'itself',
  'we', 'us', 'our', 'ours', 'ourselves',
  'they', 'them', 'their', 'theirs', 'themselves',
  // Common verbs / auxiliaries
  'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'having',
  'do', 'does', 'did', 'doing',
  'will', 'would', 'shall', 'should',
  'can', 'could', 'may', 'might', 'must',
  // Prepositions
  'in', 'on', 'at', 'to', 'for', 'with', 'from', 'by',
  'about', 'into', 'through', 'during', 'before', 'after',
  'above', 'below', 'between', 'under', 'over', 'up', 'down',
  'out', 'off', 'of', 'around', 'against', 'along',
  // Conjunctions
  'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'either',
  'neither', 'not', 'if', 'then', 'than', 'when', 'while',
  'because', 'although', 'though', 'unless', 'until',
  // Other common
  'as', 'just', 'also', 'too', 'very', 'really', 'quite',
  'here', 'there', 'where', 'how', 'what', 'which', 'who',
  'whom', 'whose', 'why', 'all', 'each', 'every', 'no',
  'some', 'any', 'few', 'more', 'most', 'other', 'only',
  'own', 'same', 'such', 'now', 'well', 'back', 'even',
  'still', 'again', 'once', 'much', 'many',
  // Fiction-common (wouldn't want to flag these)
  'said', 'like', 'got', 'went', 'came', 'made', 'let',
  'get', 'go', 'come', 'make', 'know', 'think', 'see',
  'look', 'want', 'give', 'take', 'tell', 'say',
  // Contractions (lowercased — tokenizer keeps apostrophes)
  "don't", "doesn't", "didn't", "won't", "wouldn't", "can't",
  "couldn't", "shouldn't", "isn't", "aren't", "wasn't", "weren't",
  "haven't", "hasn't", "hadn't",
  "i'm", "i've", "i'd", "i'll",
  "you're", "you've", "you'd", "you'll",
  "he's", "he'd", "he'll",
  "she's", "she'd", "she'll",
  "it's", "it'd", "it'll",
  "we're", "we've", "we'd", "we'll",
  "they're", "they've", "they'd", "they'll",
  "that's", "there's", "here's", "what's", "who's",
  "let's", "maybe", "something", "nothing", "everything", "anything",
  "someone", "everyone", "anyone", "nobody",
  "would've", "could've", "should've", "might've", "must've",
  "that'll", "there'll", "who'll",
]);
