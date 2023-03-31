import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css'

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className='AuthMain'>
      <h1>Welcome to FFXIV Guides!</h1>
      <h2>This is a spot for new Final Fantasy 14 players to get new information on Classes in game. Take a look at new guides created by players, or general guides to get additional information from fellow players.</h2>
      <button className='SignIn' onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
    </main>
  );
}