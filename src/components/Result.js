// src/components/Result.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const timeTaken = location.state?.timeTaken || 0;

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleRetry = () => navigate('/instructions');
  const handleLeaderboard = () => navigate('/leaderboard');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#121212',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      color: '#f5f5f5'
    }}>
      <div style={{
        width: '90%',
        maxWidth: '500px',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 0 25px rgba(0,0,0,0.4)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #4facfe, #00f2fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          🎉 Quiz Completed!
        </h1>

        <p style={{ fontSize: '1.3rem', margin: '20px 0', color: '#e0e0e0' }}>
          Your Score: <strong>{score} / 10</strong>
        </p>

        <p style={{ fontSize: '1rem', marginBottom: '30px', color: '#bbb' }}>
          Time Taken: <strong>{formatTime(timeTaken)}</strong>
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={handleLeaderboard} style={{
            padding: '10px 20px',
            background: 'linear-gradient(to right, #f9d423, #ff4e50)',
            color: '#121212',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>
            🏆 Leaderboard
          </button>

          <button onClick={handleRetry} style={{
            padding: '10px 20px',
            background: 'linear-gradient(to right, #00f2fe, #4facfe)',
            color: '#121212',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>
            🔁 Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
