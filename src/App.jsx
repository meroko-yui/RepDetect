import { useState, useCallback } from 'react';
import { analyze } from './engine/analyzer.js';
import TextInput from './components/TextInput.jsx';
import AnalyzedText from './components/AnalyzedText.jsx';
import SidePanel from './components/SidePanel.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [window, setWindow] = useState(50);

  const handleAnalyze = useCallback((inputText) => {
    setText(inputText);
    if (!inputText.trim()) {
      setResult(null);
      return;
    }
    const analysis = analyze(inputText, { window });
    setResult(analysis);
    setSelectedWord(null);
  }, [window]);

  const handleWindowChange = useCallback((newWindow) => {
    setWindow(newWindow);
    if (text.trim()) {
      const analysis = analyze(text, { window: newWindow });
      setResult(analysis);
    }
  }, [text]);

  const handleWordClick = useCallback((word, stem) => {
    setSelectedWord({ word, stem });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-800 bg-zinc-950">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-zinc-100 tracking-tight">
            RepDetect
          </h1>
          <span className="text-xs text-zinc-500">repetition detector for fiction</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <label className="text-zinc-400">Window:</label>
          <input
            type="range"
            min={10}
            max={200}
            value={window}
            onChange={(e) => handleWindowChange(Number(e.target.value))}
            className="w-28 accent-zinc-400"
          />
          <span className="text-zinc-300 tabular-nums w-8 text-right">{window}</span>
        </div>
      </header>

      {/* Main content */}
      {!result ? (
        <TextInput onAnalyze={handleAnalyze} />
      ) : (
        <div className="flex flex-1 min-h-0">
          {/* Text panel */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <SeverityDot color="bg-red-500" label="< 20w" />
                <SeverityDot color="bg-orange-500" label="< 50w" />
                <SeverityDot color="bg-yellow-500" label="< 100w" />
                <SeverityDot color="bg-purple-500" label="banned" dashed />
              </div>
              <button
                onClick={() => { setResult(null); setText(''); setSelectedWord(null); }}
                className="text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-700 px-3 py-1 rounded transition-colors"
              >
                New text
              </button>
            </div>
            <AnalyzedText
              text={text}
              result={result}
              onWordClick={handleWordClick}
              selectedStem={selectedWord?.stem}
            />
          </main>

          {/* Side panel */}
          <SidePanel
            result={result}
            selectedWord={selectedWord}
          />
        </div>
      )}

      {/* Footer */}
      {result && <Footer stats={result.stats} />}
    </div>
  );
}

function SeverityDot({ color, label, dashed }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
      <span className={`w-2.5 h-2.5 rounded-full ${color} ${dashed ? 'ring-1 ring-purple-500 bg-transparent' : ''}`} />
      {label}
    </div>
  );
}
