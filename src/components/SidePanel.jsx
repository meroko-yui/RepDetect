import StatsPanel from './StatsPanel.jsx';
import BannedWordsPanel from './BannedWordsPanel.jsx';
import SynonymPanel from './SynonymPanel.jsx';

export default function SidePanel({ result, selectedWord }) {
  return (
    <aside className="w-80 border-l border-zinc-800 bg-zinc-950 overflow-y-auto flex flex-col">
      {selectedWord && (
        <SynonymPanel word={selectedWord.word} />
      )}

      <StatsPanel stats={result.stats} />

      {result.stats.bannedWordsCount > 0 || result.stats.bannedPhrasesCount > 0 ? (
        <BannedWordsPanel
          bannedWords={result.bannedWordsFound}
          bannedPhrases={result.bannedPhrasesFound}
        />
      ) : null}
    </aside>
  );
}
