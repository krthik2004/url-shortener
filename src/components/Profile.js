import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout,editURL, deleteURL } from '../store/userSlice';
import AddURL from './AddURL';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const loggedInUser = useSelector((state) => state.user.loggedInUser);
   const userUrls = useSelector((state) => state.user.userUrls[loggedInUser] || []);

   const [searchTerm, setSearchTerm] = useState('');
   const [editingIndex, setEditingIndex] = useState(null);
   const [editTitle, setEditTitle] = useState('');
   const [editURLS, setEditURL] = useState('');

   const handleLogout = () => {
      dispatch(logout());
      navigate('/');
   };

   const startEditing = (index) => {
      setEditingIndex(index);
      setEditTitle(userUrls[index].title);
      setEditURL(userUrls[index].url);
   };

   const handleEditURL = () => {
      if (editingIndex !== null) {
         if (!editTitle.trim() || !editURLS.trim()) {
            alert("Title and URL cannot be empty.");
            return;
         }
            var data ={
               index: editingIndex, 
               title: editTitle.trim(), 
               url: editURLS.trim()
            }
         // Dispatch the action to update the URL
         dispatch(editURL(data));
   
         // Reset editing state
         setEditingIndex(null);
         setEditTitle('');
         setEditURL('');
      }
   };
   
   const handleDeleteURL = (index) => {
      dispatch(deleteURL({ index }));
   };

   const filteredUrls = userUrls.filter(
      (item) =>
         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.url.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div style={styles.container}>
         <div style={styles.navbar}>
            <h2 style={styles.logo}>URL Shortener</h2>
            <input
               type="text"
               placeholder="Search URLs"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               style={styles.searchInput}
            />
            <button onClick={handleLogout} style={styles.logoutButton}>
               Logout
            </button>
         </div>

         <div style={styles.content}>
            {loggedInUser ? (
               <div>
                 <center> <h3 style={styles.heading}>Welcome, {loggedInUser}!</h3></center>
                  <AddURL />

                  <h3 style={styles.subHeading}>Your URLs:</h3>

                  <table style={styles.table}>
                     <thead>
                        <tr>
                           <th>Title</th>
                           <th>Original URL</th>
                           <th>Short URL</th>
                           <th>Added Time</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {filteredUrls.map((item, index) => (
                           <tr key={index}>
                              <td>{item.title}</td>
                              <td>{item.url}</td>
                              <td>
                                 <a href={item.shortUrl} target="_blank" rel="noopener noreferrer">
                                    {item.shortUrl}
                                 </a>
                              </td>
                              <td>{item.addedTime}</td>
                              <td>
                                 <button
                                    onClick={() => startEditing(index)}
                                    style={styles.actionButton}
                                 >
                                    Edit
                                 </button>
                                 <button
                                    onClick={() => handleDeleteURL(index)}
                                    style={styles.actionButton}
                                 >
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  {editingIndex !== null && (
                     <div style={styles.editContainer}>
                        <h4>Edit URL</h4>
                        <input
                           type="text"
                           value={editTitle}
                           onChange={(e) => setEditTitle(e.target.value)}
                           placeholder="New Title"
                           style={styles.input}
                        />
                        <input
                           type="text"
                           value={editURLS}
                           onChange={(e) => setEditURL(e.target.value)}
                           placeholder="New URL"
                           style={styles.input}
                        />
                        <button onClick={handleEditURL} style={styles.updateButton}>
                           Update
                        </button>
                        <button onClick={() => setEditingIndex(null)} style={styles.cancelButton}>
                           Cancel
                        </button>
                     </div>
                  )}
               </div>
            ) : (
               <p style={styles.loginPrompt}>Please log in to view your profile.</p>
            )}
         </div>
      </div>
   );
};

const styles = {
   container: {
      fontFamily: 'Arial, sans-serif',
   },
   navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
   },
   logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
   },
   searchInput: {
      flex: 1,
      margin: '0 20px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      outline: 'none',
   },
   logoutButton: {
      padding: '8px 16px',
      backgroundColor: '#ff4b5c',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
   },
   content: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
   },
   heading: {
      fontSize: '1.8rem',
      color: '#333',
      marginBottom: '20px',
   },
   subHeading: {
      fontSize: '1.5rem',
      color: '#333',
      margin: '20px 0 10px',
   },
   table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
   },
   actionButton: {
      padding: '5px 10px',
      margin: '0 5px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
   },
   editContainer: {
      backgroundColor: '#f9f9f9',
      padding: '15px',
      borderRadius: '8px',
      marginTop: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
   },
   input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      outline: 'none',
   },
   updateButton: {
      padding: '10px',
      marginTop: '10px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
   },
   cancelButton: {
      padding: '10px',
      marginTop: '10px',
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
   },
   loginPrompt: {
      fontSize: '1.2rem',
      color: '#555',
      textAlign: 'center',
      marginTop: '50px',
   },
};

export default Profile;
