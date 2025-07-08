import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/login';
      const res = await api.post(endpoint, { username, password });
      localStorage.setItem('username', res.data.username || username);
      navigate('/instructions');
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  const styles = {
    page: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
    },
    box: {
      width: '360px',
      padding: '40px',
      borderRadius: '12px',
      backgroundColor: '#1e1e1e',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
      textAlign: 'center',
      color: '#f5f5f5',
    },
    title: {
      fontSize: '2.4rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #4facfe, #00f2fe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '20px',
      letterSpacing: '1px',
    },
    label: {
      textAlign: 'left',
      marginTop: '15px',
      marginBottom: '5px',
      fontWeight: 500,
      fontSize: '0.9rem',
      color: '#ddd',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #444',
      backgroundColor: '#262626',
      color: '#fff',
      outline: 'none',
    },
    toggle: {
      marginTop: '5px',
      textAlign: 'right',
      fontSize: '0.85rem',
      color: '#00baff',
      cursor: 'pointer',
    },
    button: {
      marginTop: '20px',
      padding: '10px',
      width: '100%',
      backgroundColor: '#2979ff',
      color: '#fff',
      borderRadius: '6px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
    },
    switchMode: {
      marginTop: '15px',
      fontSize: '0.85rem',
      color: '#bbb',
    },
    link: {
      color: '#00baff',
      cursor: 'pointer',
      fontWeight: 500,
      marginLeft: '5px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.title}>QuizIndia <span style={{ fontWeight: 300 }}>!</span></h1>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div style={styles.toggle} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </div>
          <button type="submit" style={styles.button}>
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>
        <div style={styles.switchMode}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignup(!isSignup)} style={styles.link}>
            {isSignup ? ' Login' : ' Sign Up'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
