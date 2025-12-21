import React, { useEffect, useState } from 'react';

export const Loading = ({ size = 24 }) => {
  const quotes = [
    'Analyzing loops and recursion...',
    'Measuring time and space...',
    'Estimating complexity curves...',
    'Scanning for nested iterations...'
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % quotes.length), 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col items-center gap-2 p-3 text-slate-400">
      <svg width={size} height={size} viewBox="0 0 24 24" className="animate-spin">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
        <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
      </svg>
      <span className="text-center text-sm">{quotes[i]}</span>
    </div>
  );
};
export default Loading;
