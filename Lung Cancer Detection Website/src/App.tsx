import { useState } from 'react';
import { LoginSignup } from './components/LoginSignup';
import { ImageUpload } from './components/ImageUpload';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginSignup onLogin={handleLogin} />
      ) : (
        <ImageUpload onLogout={handleLogout} />
      )}
    </>
  );
}
