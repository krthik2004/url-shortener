import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSignup = () => {
      dispatch(signup({ username, password }));
      navigate('/login'); // Redirect to Login page after signup
   };

   return (
      <div style={styles.container}>
         <div style={styles.card}>
            <h1 style={styles.logo}>URL Shortener</h1>
            <h2 style={styles.heading}>Create an Account</h2>
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
            <button onClick={handleSignup} style={styles.signupButton}>
               Sign Up
            </button>
            <p style={styles.text}>Already have an account?</p>
            <button onClick={() => navigate('/login')} style={styles.loginButton}>
               Login
            </button>
         </div>
      </div>
   );
};

const styles = {
   container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #74ebd5, #9face6)',
      padding: '20px',
   },
   card: {
      backgroundColor: '#ffffff',
      padding: '40px 30px',
      borderRadius: '12px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
   },
   logo: {
      fontSize: '2rem',
      color: '#007BFF',
      marginBottom: '10px',
      fontFamily: 'Poppins, sans-serif',
   },
   heading: {
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '20px',
      fontFamily: 'Poppins, sans-serif',
   },
   input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1px solid #ddd',
      outline: 'none',
      fontFamily: 'Poppins, sans-serif',
      transition: 'border-color 0.3s',
   },
   signupButton: {
      width: '100%',
      padding: '12px',
      fontSize: '1.1rem',
      borderRadius: '6px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      marginBottom: '15px',
      fontFamily: 'Poppins, sans-serif',
   },
   signupButtonHover: {
      backgroundColor: '#0056b3',
   },
   text: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '10px',
      fontFamily: 'Poppins, sans-serif',
   },
   loginButton: {
      width: '100%',
      padding: '12px',
      fontSize: '1.1rem',
      borderRadius: '6px',
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      fontFamily: 'Poppins, sans-serif',
   },
};

export default Signup;
