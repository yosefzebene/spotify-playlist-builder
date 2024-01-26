import './App.css';
import { getToken, currentToken, redirectToSpotifyAuthorize, getRefreshToken } from './spotify_auth/spotify';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import HomePage from './components/HomePage.js';

function App() {
  const [spotifyToken, setSpotifyToken] = useState('');

  useEffect(() => {
    const getTokenAndSetState = async () => {
      const token = await getToken(code);
      setSpotifyToken(token);
    }

    const checkTokenExpiration = async () => {
      const expirationTime = currentToken.expires;
      const now = new Date();

      // Refresh the token if it is within 5 mins of expiring
      if (expirationTime && new Date(expirationTime) <= new Date(now.getTime() + 5 * 60 * 1000)) {
        const newToken = await getRefreshToken();
        setSpotifyToken(newToken);
      }
      else {
        setSpotifyToken(currentToken.access_token);
      }
    }

    const args = new URLSearchParams(window.location.search);
    const code = args.get('code');

    // If we have code in the search params, handle getting the token.
    if (code) {
      getTokenAndSetState();

      // Remove code from url
      const url = new URL(window.location.href);
      url.searchParams.delete('code');

      const updateUrl = url.search ? url.href : url.href.replace('?', '');
      window.history.replaceState({}, document.title, updateUrl);
    }

    // Check if token is about to expire and refresh
    checkTokenExpiration();

    // Set up interval to periodically check token expiration
    const tokenCheckInterval = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => clearInterval(tokenCheckInterval);
  }, []);

  return (
    <div className="App">
      { spotifyToken ? 
        <HomePage spotifyToken={spotifyToken} /> : <Button onClick={redirectToSpotifyAuthorize}>Sign in with spotify!</Button>
      }
    </div>
  );
}

export default App;
