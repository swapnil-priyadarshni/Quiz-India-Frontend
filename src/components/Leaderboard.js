import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    const fetchScores = async () => {
      const res = await api.get('/quiz/leaderboard');
      setScores(res.data);
    };
    fetchScores();
  }, []);

  useEffect(() => {
    let filtered = [...scores];
    if (usernameFilter.trim()) {
      filtered = filtered.filter(entry =>
        entry.username.includes(usernameFilter.trim())
      );
    }    
    if (startDate) {
      filtered = filtered.filter(entry =>
        new Date(entry.timestamp) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(entry =>
        new Date(entry.timestamp) <= new Date(endDate)
      );
    }
    setFilteredScores(filtered);
    setPage(1); // reset to first page on filter
  }, [scores, usernameFilter, startDate, endDate]);

  const logout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const totalPages = Math.ceil(filteredScores.length / perPage);
  const paginated = filteredScores.slice((page - 1) * perPage, page * perPage);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#121212',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', sans-serif",
      color: '#f5f5f5'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div style={{
          fontSize: '2.4rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #4facfe, #00f2fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px'
        }}>
          QuizIndia <span style={{ fontWeight: 300 }}>!</span>
        </div>
        <button onClick={logout} style={{
          padding: '8px 16px',
          backgroundColor: '#ff4d4f',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500
        }}>Logout</button>
      </div>

      {/* Filters */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'space-between'
      }}>
        <input
          type="text"
          placeholder="Search username..."
          value={usernameFilter}
          onChange={e => setUsernameFilter(e.target.value)}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '8px',
            borderRadius: '6px',
            backgroundColor: '#1c1c1c',
            border: '1px solid #333',
            color: '#f5f5f5'
          }}
        />
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '6px',
            backgroundColor: '#1c1c1c',
            border: '1px solid #333',
            color: '#f5f5f5'
          }}
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '6px',
            backgroundColor: '#1c1c1c',
            border: '1px solid #333',
            color: '#f5f5f5'
          }}
        />
      </div>

      {/* Leaderboard Card */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 0 25px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '2rem',
          background: 'linear-gradient(to right, #ff4e50, #f9d423)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>🏆 All Quiz Attempts</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              {['#', 'Username', 'Score', 'Time Taken', 'Submitted At'].map((text, idx) => (
                <th key={idx} style={{
                  padding: '12px',
                  backgroundColor: '#2a2a2a',
                  color: '#00f2fe',
                  fontWeight: 600,
                  borderBottom: '1px solid #333',
                  textAlign: 'center'
                }}>{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((entry, idx) => {
              const isCurrentUser = entry.username === currentUser;
              return (
                <tr key={entry._id} style={{
                  backgroundColor: isCurrentUser ? '#223344' : idx % 2 === 0 ? '#1c1c1c' : '#262626',
                  fontWeight: isCurrentUser ? 'bold' : 'normal'
                }}>
                  <td style={td}>{(page - 1) * perPage + idx + 1}</td>
                  <td style={td}>
                    {entry.username}
                    {entry.score === 10 && <span style={{ marginLeft: '6px' }}>🏅</span>}
                  </td>
                  <td style={td}>{entry.score}</td>
                  <td style={td}>{formatTime(entry.timeTaken)}</td>
                  <td style={td}>{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)} style={pageBtn(page === 1)}>◀ Prev</button>
          <span style={{ alignSelf: 'center', color: '#bbb' }}>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={pageBtn(page === totalPages)}>Next ▶</button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={() => navigate('/instructions')} style={{
            padding: '12px 24px',
            background: 'linear-gradient(to right, #4facfe, #00f2fe)',
            color: '#121212',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>🔙 Back to Quiz</button>
        </div>
      </div>
    </div>
  );
};

const td = {
  padding: '10px',
  textAlign: 'center',
  borderBottom: '1px solid #333',
  color: '#eee',
};

const pageBtn = (disabled) => ({
  padding: '6px 14px',
  background: disabled ? '#333' : 'linear-gradient(to right, #4facfe, #00f2fe)',
  color: disabled ? '#777' : '#121212',
  border: 'none',
  borderRadius: '6px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: 'bold',
});

export default Leaderboard;
