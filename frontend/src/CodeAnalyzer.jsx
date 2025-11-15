import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading from './Loading.jsx';
import TimeComplexityChart from './ComplexityChart.jsx';

const supportedModels = [
  { id: 'openai/gpt-oss-120b', shortName: 'GPT-OSS 120B', label: 'Experimental' },
  { id: 'llama3-70b-8192', shortName: 'LLaMA 3 70B', label: 'Recommended' },
  { id: 'deepseek-r1-distill-llama-70b', shortName: 'DeepSeek 70B', label: 'Thinking' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', shortName: 'LLaMA 4 Scout 17B' },
  { id: 'llama-3.3-70b-versatile', shortName: 'LLaMA 3.3 70B' },
  { id: 'compound-beta', shortName: 'Compound Beta' },
];

export default function CodeAnalyzer() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const analysisRef = useRef(null);

  useEffect(() => {
    document.title = 'Code Analyzer';
    if (result || loading) {
      analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [result, loading]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      window.alert('Please paste your code before submitting.');
      return;
    }
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/ai/analyze/complexity/ai`;
      const response = await axios.post(url, { code }, { withCredentials: true });
      setResult(null);
      const parsed = response.data.result;
      setResult(parsed);
    } catch (err) {
      console.error(err);
      window.scrollTo(0, 0);
      window.alert(err?.response?.data?.message || err?.response?.data?.error || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const container = {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '80px 20px 40px',
    color: '#e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  };

  const headerRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  };

  const titleBlock = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  };

  const titleStyle = {
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: 0.4,
    margin: 0,
  };

  const subtitleStyle = {
    margin: 0,
    fontSize: 13,
    color: '#9ca3af',
  };

  const badge = {
    fontSize: 11,
    padding: '4px 10px',
    borderRadius: 999,
    border: '1px solid #22c55e33',
    background: 'linear-gradient(135deg,#065f46,#052e16)',
    color: '#bbf7d0',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
  };

  const layout = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
    gap: 20,
    alignItems: 'flex-start',
  };

  const editorCard = {
    background: 'radial-gradient(circle at top,#020617,#020617 40%,#020617)',
    borderRadius: 14,
    border: '1px solid #1e293b',
    boxShadow: '0 18px 45px rgba(15,23,42,0.75)',
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };

  const editorHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    color: '#9ca3af',
  };

  const editorLabel = {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.08,
    textTransform: 'uppercase',
    color: '#64748b',
  };

  const chipRow = {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  };

  const chip = {
    fontSize: 10,
    borderRadius: 999,
    padding: '4px 8px',
    border: '1px solid #1f2937',
    background: '#020617',
    color: '#94a3b8',
  };

  const card = {
    background: 'radial-gradient(circle at top,#020617,#020617 40%,#020617)',
    border: '1px solid #1f2937',
    borderRadius: 14,
    padding: 18,
    boxShadow: '0 18px 45px rgba(15,23,42,0.75)',
  };

  return (
    <div style={container}>
      <div style={headerRow}>
        <div style={titleBlock}>
          <h1 style={titleStyle}>
            Code Analyzer <span style={{ color: '#eab308' }}>✨</span>
          </h1>
          <p style={subtitleStyle}>
            Paste any snippet and get AI-assisted time & space complexity with a visual comparison.
          </p>
        </div>
      </div>

      <div style={layout}>
        {/* Editor panel */}
        <div style={editorCard}>
          <div style={editorHeader}>
            <span style={editorLabel}>Input code</span>
            <div style={chipRow}>
              <span style={chip}>Supports C++ / Java / Python / JS / more</span>
              <span style={chip}>Tip: Keep it to a single function or class for best results</span>
            </div>
          </div>

          <textarea
            value={code}
            spellCheck="false"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your C++/Python/JS/Rust/Java/any code here..."
            style={{
              width: '100%',
              minHeight: '42vh',
              background: 'radial-gradient(circle at top,#020617,#020617 45%,#020617)',
              border: '1px solid #0f172a',
              borderRadius: 10,
              color: '#e5e7eb',
              padding: 16,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: 13,
              resize: 'vertical',
              outline: 'none',
              boxShadow: '0 0 0 1px rgba(148,163,184,0.1)',
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 11, color: '#6b7280' }}>
              Your code never leaves your machine except for analysis by the configured AI model.
            </span>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                padding: '10px 18px',
                borderRadius: 9999,
                border: '1px solid #22c55e33',
                background: loading
                  ? 'linear-gradient(135deg,#047857,#065f46)'
                  : 'linear-gradient(135deg,#22c55e,#16a34a)',
                color: '#022c22',
                fontWeight: 700,
                cursor: loading ? 'progress' : 'pointer',
                opacity: loading ? 0.8 : 1,
                fontSize: 13,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 10px 30px rgba(34,197,94,0.32)',
              }}
            >
              {loading ? 'Analyzing…' : 'Analyze Code'}
            </button>
          </div>
        </div>

        {/* Results panel */}
        <div ref={analysisRef}>
          {(result || loading) && (
            <div style={card}>
            {loading ? (
              <Loading />
            ) : result?.error ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <h2 style={{ color: '#f87171', margin: 0 }}>Error Occurred</h2>
                <p style={{ color: '#d1d5db', textAlign: 'center' }}>{result.error || 'An unexpected error occurred while analyzing your code.'}</p>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    textAlign: 'left',
                    backgroundImage: 'linear-gradient(to right,#3b82f6,#06b6d4)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    marginTop: 0,
                    marginBottom: 4,
                  }}
                >
                  Code Complexity Analysis
                </h2>
                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 0, marginBottom: 14 }}>
                  Estimated from your snippet using heuristics and AI. Treat this as guidance, not a formal proof.
                </p>

                <div style={{ display: 'grid', gap: 18 }}>
                  <div>
                    <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>Time Complexity:</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{ fontSize: 24, fontWeight: 800, color: '#a3e635' }}
                        dangerouslySetInnerHTML={{ __html: result.timeComplexity }}
                      />
                      <TimeComplexityChart
                        complexity={result.timeComplexity}
                        complexityType={result.timeComplexityType}
                        name={'Time Complexity'}
                      />
                    </div>
                    <p style={{ color: '#d1d5db', marginTop: 6 }}>{result.timeExplanation}</p>
                  </div>

                  <div>
                    <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>Space Complexity:</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{ fontSize: 24, fontWeight: 800, color: '#38bdf8' }}
                        dangerouslySetInnerHTML={{ __html: result.spaceComplexity }}
                      />
                      <TimeComplexityChart
                        complexity={result.spaceComplexity}
                        complexityType={result.spaceComplexityType}
                        name={'Space Complexity'}
                      />
                    </div>
                    <p style={{ color: '#d1d5db', marginTop: 6 }}>{result.spaceExplanation}</p>
                  </div>

                  <div>
                    <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>Code Rating (out of 5):</div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {Array.from({ length: Number(result.codeRating || 0) }).map((_, idx) => (
                        <span key={idx} style={{ color: '#facc15', fontSize: 22 }}>★</span>
                      ))}
                    </div>
                  </div>

          
                </div>
              </>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
