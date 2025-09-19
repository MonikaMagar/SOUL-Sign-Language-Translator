import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import GoogleOAuthProvider
import App from './App';

// Replace with your actual Google OAuth client ID
const CLIENT_ID = '91828566801-e58ej3cgd70fcaq5gjl69og60j4h2kiq.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* Wrap the App component with GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
