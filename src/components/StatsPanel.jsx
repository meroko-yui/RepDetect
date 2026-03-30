export default function StatsPanel({ stats }) {
  return (
    <div className="p-4 border-b border-zinc-800">
      <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
        Statistics
      </h3>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <Stat label="Words" value={stats.wordCount} />
        <Stat label="Unique" value={stats.uniqueContentWords} />
        <Stat label="Repetition groups" value={stats.repetitionGroups} />
        <Stat label="Flagged" value={stats.flaggedTokens} />
      </div>

      {stats.topRepeated.length > 0 && (
        <>
          <h4 className="text-xs text-zinc-500 mb-2">Top repeated</h4>
          <div className="space-y-1">
            {stats.topRepeated.map((r) => (
              <div key={r.stem} className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 truncate">
                  {r.variants.slice(0, 3).join(', ')}
                </span>
                <span className="text-zinc-500 ml-2 tabular-nums">{r.count}x</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-zinc-900 rounded px-3 py-2">
      <div className="text-lg font-semibold text-zinc-100 tabular-nums">{value}</div>
      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
