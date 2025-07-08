// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const totalTime = 300;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/quiz/questions').then(res => setQuestions(res.data));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [questions]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleOptionChange = (index) => {
    setAnswers({ ...answers, [currentQ]: index });
  };

  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      submitQuiz();
    }
  };

  const calculateScore = () => {
    return questions.reduce((acc, q, i) =>
      answers[i] === q.correctAnswer ? acc + 1 : acc, 0
    );
  };

  const submitQuiz = async () => {
    const username = localStorage.getItem('username');
    const score = calculateScore();
    const timeTaken = totalTime - timeLeft;
    await api.post('/quiz/submit', { username, score, timeTaken });
    navigate('/result', { state: { score, timeTaken } });
  };

  if (!questions.length) {
    return <p style={{ textAlign: 'center', marginTop: 60, color: '#ccc' }}>Loading questions...</p>;
  }

  const q = questions[currentQ];
  const selected = answers[currentQ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#121212',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', sans-serif",
      color: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '650px',
        margin: '0 auto',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        padding: '35px 40px',
        boxShadow: '0 0 25px rgba(0,0,0,0.4)',
      }}>
        <div style={{ textAlign: 'right', marginBottom: '10px', color: '#00f2fe' }}>
          ⏱ Time Left: <strong>{formatTime(timeLeft)}</strong>
        </div>

        <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>
          {currentQ + 1}. {q.question}
        </h3>

        {q.options.map((option, index) => (
          <label key={index} style={{
            display: 'block',
            padding: '10px 14px',
            marginBottom: '12px',
            border: selected === index ? '2px solid #00f2fe' : '1px solid #333',
            borderRadius: '6px',
            backgroundColor: selected === index ? '#223344' : '#1a1a1a',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}>
            <input
              type="radio"
              name={`q${currentQ}`}
              value={index}
              checked={selected === index}
              onChange={() => handleOptionChange(index)}
              style={{ marginRight: '10px' }}
            />
            {option}
          </label>
        ))}

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          {selected !== undefined && (
            <button
              onClick={handleNext}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(to right, #00f2fe, #4facfe)',
                color: '#121212',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              {currentQ === questions.length - 1 ? 'Submit Quiz' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
