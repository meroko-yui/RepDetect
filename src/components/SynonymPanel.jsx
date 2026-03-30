import { useState, useEffect } from 'react';

const cache = new Map();

async function fetchSynonyms(word) {
  if (cache.has(word)) return cache.get(word);

  try {
    const [synRes, mlRes] = await Promise.all([
      fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}&max=10`),
      fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(word)}&max=10`),
    ]);

    const synonyms = await synRes.json();
    const similar = await mlRes.json();

    const result = { synonyms, similar };
    cache.set(word, result);
    return result;
  } catch {
    return { synonyms: [], similar: [] };
  }
}

export default function SynonymPanel({ word }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setData(null);

    fetchSynonyms(word).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [word]);

  const handleCopy = (w) => {
    navigator.clipboard.writeText(w);
    setCopied(w);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="p-4 border-b border-zinc-800">
      <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
        Synonyms for
      </h3>
      <p className="text-sm font-semibold text-zinc-100 mb-3">"{word}"</p>

      {loading && (
        <p className="text-xs text-zinc-600 animate-pulse">Fetching from Datamuse...</p>
      )}

      {data && (
        <>
          {data.synonyms.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[10px] text-zinc-500 uppercase mb-1">Direct synonyms</h4>
              <div className="flex flex-wrap gap-1.5">
                {data.synonyms.map((s) => (
                  <WordChip
                    key={s.word}
                    word={s.word}
                    onClick={() => handleCopy(s.word)}
                    isCopied={copied === s.word}
                  />
                ))}
              </div>
            </div>
          )}

          {data.similar.length > 0 && (
            <div>
              <h4 className="text-[10px] text-zinc-500 uppercase mb-1">Semantically similar</h4>
              <div className="flex flex-wrap gap-1.5">
                {data.similar.map((s) => (
                  <WordChip
                    key={s.word}
                    word={s.word}
                    onClick={() => handleCopy(s.word)}
                    isCopied={copied === s.word}
                    dimmed
                  />
                ))}
              </div>
            </div>
          )}

          {data.synonyms.length === 0 && data.similar.length === 0 && (
            <p className="text-xs text-zinc-600">No synonyms found.</p>
          )}
        </>
      )}
    </div>
  );
}

function WordChip({ word, onClick, isCopied, dimmed }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 rounded text-xs border transition-colors ${
        isCopied
          ? 'bg-green-900/40 border-green-700 text-green-300'
          : dimmed
            ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
            : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500'
      }`}
      title={isCopied ? 'Copied!' : `Click to copy "${word}"`}
    >
      {isCopied ? '✓ ' : ''}{word}
    </button>
  );
}
