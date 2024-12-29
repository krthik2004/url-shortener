import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectHandler = () => {
   const { shortUrl } = useParams();
   const navigate = useNavigate();
   const userUrls = useSelector((state) => state.user.userUrls);

   useEffect(() => {
      // Search for the original URL in all users' URLs
      let foundUrl = null;
      Object.values(userUrls).forEach((urls) => {
         const match = urls.find((item) => item.shortUrl.includes(shortUrl));
         if (match) {
            foundUrl = match.url;
         }
      });

      if (foundUrl) {
         // Redirect to the original URL
         window.location.href = foundUrl;
      } else {
         // If not found, redirect to a 404 page or show an error
         alert('URL not found!');
         navigate('/');
      }
   }, [shortUrl, userUrls, navigate]);

   return <p>Redirecting...</p>;
};

export default RedirectHandler;
