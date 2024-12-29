import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import RedirectHandler from './components/RedirectHandler'; // New Component

function App() {
   return (
      <Router>
         <div>
            <Routes>
               <Route path="/" element={<Signup />} />
               <Route path="/login" element={<Login />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/short/:shortUrl" element={<RedirectHandler />} /> {/* New Route */}
            </Routes>
         </div>
      </Router>
   );
}

export default App;
