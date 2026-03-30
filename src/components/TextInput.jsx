import { useState, useRef } from 'react';

export default function TextInput({ onAnalyze }) {
  const [draft, setDraft] = useState('');
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const text = await file.text();
      setDraft(text);
    } else {
      alert('Only .txt and .md files are supported for now.');
    }
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  const handlePaste = (e) => {
    // Let the paste happen naturally into the textarea
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Paste your text</h2>
        <p className="text-sm text-zinc-500">
          Everything runs in your browser. Your text never leaves your computer.
        </p>
      </div>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onPaste={handlePaste}
        placeholder="Paste a chapter, a scene, a page — whatever you want to check for repetitions..."
        className="w-full max-w-3xl h-72 bg-zinc-850 border border-zinc-700 rounded-lg p-4 text-sm text-zinc-200 placeholder:text-zinc-600 resize-y focus:outline-none focus:border-zinc-500 transition-colors"
        autoFocus
      />

      <div className="flex items-center gap-4">
        <button
          onClick={() => onAnalyze(draft)}
          disabled={!draft.trim()}
          className="px-6 py-2 bg-zinc-100 text-zinc-900 rounded font-medium text-sm hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Analyze
        </button>

        <span className="text-zinc-600 text-xs">or</span>

        <button
          onClick={() => fileRef.current?.click()}
          className="px-4 py-2 border border-zinc-700 text-zinc-400 rounded text-sm hover:border-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Load .txt file
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".txt,.md"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      {draft && (
        <p className="text-xs text-zinc-600">
          {draft.split(/\s+/).filter(Boolean).length} words ready
        </p>
      )}
    </div>
  );
}
