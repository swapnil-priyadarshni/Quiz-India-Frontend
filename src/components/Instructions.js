import React from 'react';
import { useNavigate } from 'react-router-dom';

const Instructions = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const logout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const goToLeaderboard = () => navigate('/leaderboard');
  const startQuiz = () => navigate('/quiz');

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#121212',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', sans-serif",
      color: '#f5f5f5',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
    },
    appTitle: {
      fontSize: '2.4rem',
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '1px',
    },
    btnRow: {
      display: 'flex',
      gap: '12px',
    },
    logoutBtn: {
      padding: '8px 16px',
      backgroundColor: '#ff5252',
      color: 'white',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    leaderboardBtn: {
      padding: '8px 16px',
      background: 'linear-gradient(to right, #f9d423, #ff4e50)',
      color: '#000',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    card: {
      maxWidth: '650px',
      margin: '0 auto',
      backgroundColor: '#1c1c1c',
      padding: '35px 40px',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '10px',
    },
    subheading: {
      fontSize: '1rem',
      marginBottom: '20px',
      color: '#aaa',
    },
    list: {
      paddingLeft: '18px',
      fontSize: '0.95rem',
      lineHeight: '1.7',
      color: '#ddd',
    },
    startBtn: {
      marginTop: '30px',
      padding: '12px 24px',
      background: 'linear-gradient(to right, #00f2fe, #4facfe)',
      color: '#121212',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.appTitle}>QuizIndia <span style={{ fontWeight: 300 }}>!</span></div>
        <div style={styles.btnRow}>
          <button style={styles.leaderboardBtn} onClick={goToLeaderboard}>🏆 Leaderboard</button>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome, {username} 👋</h2>
        <p style={styles.subheading}>Please read the quiz rules below:</p>
        <ul style={styles.list}>
          <li>🧠 You’ll get <strong>10 general knowledge questions</strong>.</li>
          <li>⏱ You’ll have <strong>5 minutes</strong> total.</li>
          <li>✅ Each has <strong>1 correct answer</strong>.</li>
          <li>🧩 You will answer <strong>one question at a time</strong>. No skipping ahead.</li>
          <li>🔁 The quiz auto-submits if time runs out.</li>
          <li>📊 Your score and time will show up on the leaderboard.</li>
        </ul>

        <div style={{ textAlign: 'center' }}>
          <button style={styles.startBtn} onClick={startQuiz}>🚀 Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
