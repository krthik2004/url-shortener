import { createSlice } from '@reduxjs/toolkit';


// Helper function to load state from localStorage
const loadState = () => {
   const savedState = localStorage.getItem('userState');
   return savedState ? JSON.parse(savedState) : { users: [], loggedInUser: null, userUrls: {} };
};

// Helper function to save state to localStorage
const saveState = (state) => {
   localStorage.setItem('userState', JSON.stringify(state));
};

const initialState = loadState();

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      signup: (state, action) => {
         const { username, password } = action.payload;
         const userExists = state.users.some((user) => user.username === username);
         if (!userExists) {
            state.users.push({ username, password });
            state.userUrls[username] = []; // Initialize empty URL list for the user
            saveState(state);  // Save state to localStorage
         } else {
            alert("Username already taken.");
         }
      },
      login: (state, action) => {
         const { username, password } = action.payload;
         const existingUser = state.users.find(
            (user) => user.username === username && user.password === password
         );
         if (existingUser) {
            state.loggedInUser = username; // Set the logged-in user
            saveState(state);  // Save state to localStorage
         } else {
            alert("Invalid username or password.");
         }
      },
      logout: (state) => {
         state.loggedInUser = null; // Clear the logged-in user
         saveState(state);  // Save state to localStorage
      },
      addURL: (state, action) => {
         const { title, url } = action.payload;
         const loggedInUser = state.loggedInUser;
         if (loggedInUser) {
            if (state.userUrls[loggedInUser].length < 5) {
               const newURL = {
                  title,
                  url,
                  shortUrl: `http://localhost:3000/short/${Math.random().toString(36).substr(2, 6)}`,
                  addedTime: new Date().toLocaleString(),
               };
               state.userUrls[loggedInUser].push(newURL);
               saveState(state); // Save state to localStorage
            } else {
               alert('You can only add up to 5 URLs');
            }
         }
      },
      
      deleteURL: (state, action) => {
         const { index } = action.payload;
         const loggedInUser = state.loggedInUser;
         if (loggedInUser && state.userUrls[loggedInUser]) {
            state.userUrls[loggedInUser].splice(index, 1);
            saveState(state);  // Save state to localStorage
         }
      },
      editURL: (state, action) => {
         const { index, title, url } = action.payload;
         const loggedInUser = state.loggedInUser;
         if (loggedInUser && state.userUrls[loggedInUser]) {
            const updatedURL = {
               title,
               url,
               shortUrl: `https://short.url/${Math.random().toString(36).substr(2, 6)}`,
               addedTime: new Date().toLocaleString(),
            };
            state.userUrls[loggedInUser][index] = updatedURL;
            saveState(state);  // Save state to localStorage
         }
      },
   },
});

export const { signup, login, logout, addURL, deleteURL, editURL } = userSlice.actions;
export default userSlice.reducer;
