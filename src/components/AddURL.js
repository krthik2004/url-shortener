import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addURL } from '../store/userSlice';

const AddURL = () => {
   const [title, setTitle] = useState('');
   const [url, setURL] = useState('');
   const dispatch = useDispatch();
   const loggedInUser = useSelector((state) => state.user.loggedInUser);
   const userUrls = useSelector((state) => state.user.userUrls[loggedInUser] || []);

   const handleAddURL = () => {
      if (userUrls.length >= 5) {
         alert("You have reached the limit of 5 URLs.");
         return;
      }

      dispatch(addURL({ title, url }));
      setTitle('');
      setURL('');
   };

   return (
      <div style={styles.container}>
         <h3 style={styles.heading}>Add a New URL</h3>
         <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
         />
         <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            style={styles.input}
         />
         <button
            onClick={handleAddURL}
            style={{
               ...styles.button,
               ...(title && url ? {} : styles.buttonDisabled),
            }}
            disabled={!title || !url}
         >
            Add URL
         </button>
         {userUrls.length >= 5 && (
            <p style={styles.errorText}>You have reached the maximum of 5 URLs.</p>
         )}
      </div>
   );
};

const styles = {
   container: {
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      textAlign: 'center',
   },
   heading: {
      fontSize: '1.8rem',
      color: '#333',
      marginBottom: '15px',
      fontFamily: 'Poppins, sans-serif',
      borderBottom: '2px solid #fcb69f',
      paddingBottom: '10px',
   },
   input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #ddd',
      outline: 'none',
      fontFamily: 'Poppins, sans-serif',
      transition: 'all 0.3s',
   },
   button: {
      width: '100%',
      padding: '10px',
      fontSize: '1.1rem',
      borderRadius: '8px',
      backgroundColor: '#ff7e67',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'Poppins, sans-serif',
      transition: 'background-color 0.3s, transform 0.2s',
   },
   buttonDisabled: {
      backgroundColor: '#ddd',
      cursor: 'not-allowed',
   },
   errorText: {
      color: '#d9534f',
      marginTop: '15px',
      fontSize: '0.9rem',
      fontFamily: 'Poppins, sans-serif',
   },
};

export default AddURL;
