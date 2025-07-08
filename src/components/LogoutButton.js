// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <button onClick={logout} style={{ float: 'right', margin: '10px' }}>
      🚪 Logout
    </button>
  );
};

export default LogoutButton;
