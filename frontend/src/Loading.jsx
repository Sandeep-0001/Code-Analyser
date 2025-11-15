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
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,padding:12,color:'#9ca3af'}}>
      <svg width={size} height={size} viewBox="0 0 24 24" className="spin" style={{animation:'spin 1s linear infinite'}}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
        <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
      </svg>
      <span style={{textAlign:'center'}}>{quotes[i]}</span>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};
export default Loading;
