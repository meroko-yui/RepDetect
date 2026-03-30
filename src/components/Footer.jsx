export default function Footer({ stats }) {
  return (
    <footer className="flex items-center justify-between px-6 py-2 border-t border-zinc-800 bg-zinc-950 text-xs text-zinc-500">
      <div className="flex gap-6">
        <span>{stats.wordCount} words</span>
        <span>{stats.repetitionGroups} repetition groups</span>
        <span>{stats.flaggedTokens} flagged</span>
      </div>
      <div className="flex gap-6">
        <span>{stats.bannedWordsCount + stats.bannedPhrasesCount} banned</span>
      </div>
    </footer>
  );
}
