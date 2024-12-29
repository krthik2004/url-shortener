import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = () => {
      dispatch(login({ username, password }));
      navigate('/profile'); // Redirect to profile if login is successful
   };

   return (
      <div style={styles.container}>
         <div style={styles.card}>
            <h1 style={styles.mainHeading}>URL Shortener</h1>
            <h2 style={styles.subHeading}>Login</h2>
            <input
               type="text"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               style={styles.input}
            />
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               style={styles.input}
            />
            <button onClick={handleLogin} style={styles.button}>
               Login
            </button>
         </div>
      </div>
   );
};

const styles = {
   container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #8e44ad, #3498db)',
      padding: '20px',
   },
   card: {
      backgroundColor: '#fff',
      padding: '30px 40px',
      borderRadius: '15px',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      maxWidth: '400px',
      width: '100%',
   },
   mainHeading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#4CAF50',
      marginBottom: '10px',
      fontFamily: "'Poppins', sans-serif",
   },
   subHeading: {
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '20px',
      fontFamily: "'Poppins', sans-serif",
   },
   input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #ddd',
      outline: 'none',
      transition: 'all 0.3s',
      fontFamily: "'Poppins', sans-serif",
   },
   button: {
      width: '100%',
      padding: '12px',
      fontSize: '1.1rem',
      borderRadius: '8px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontFamily: "'Poppins', sans-serif",
   },
   buttonHover: {
      backgroundColor: '#388E3C',
      transform: 'scale(1.05)',
   },
};

export default Login;
