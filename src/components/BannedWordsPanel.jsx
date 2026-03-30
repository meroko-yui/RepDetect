export default function BannedWordsPanel({ bannedWords, bannedPhrases }) {
  // Group banned words by word
  const wordCounts = {};
  for (const bw of bannedWords) {
    wordCounts[bw.word] = (wordCounts[bw.word] || 0) + 1;
  }
  const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);

  // Group banned phrases
  const phraseCounts = {};
  for (const bp of bannedPhrases) {
    phraseCounts[bp.phrase] = (phraseCounts[bp.phrase] || 0) + 1;
  }
  const sortedPhrases = Object.entries(phraseCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-4 border-b border-zinc-800">
      <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
        <span className="text-purple-400">Banned</span> words & phrases
      </h3>

      {sortedWords.length > 0 && (
        <div className="space-y-1 mb-3">
          {sortedWords.map(([word, count]) => (
            <div key={word} className="flex items-center justify-between text-xs">
              <span className="text-purple-300">{word}</span>
              <span className="text-zinc-500 tabular-nums">{count}x</span>
            </div>
          ))}
        </div>
      )}

      {sortedPhrases.length > 0 && (
        <div className="space-y-1">
          {sortedPhrases.map(([phrase, count]) => (
            <div key={phrase} className="flex items-center justify-between text-xs">
              <span className="text-purple-300 italic">"{phrase}"</span>
              <span className="text-zinc-500 tabular-nums">{count}x</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
