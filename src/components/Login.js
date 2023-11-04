import React, { useState }  from 'react';
import SignPage from './SignPage';

export default function Login ({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleEmail (e) { setEmail(e.target.value) };
  function handlePassword (e) { setPassword(e.target.value) };

  function handleSubmit (e) {
    e.preventDefault();
    onLogin({password, email});
    setPassword('');
    setEmail('');
  }
  
  return (
    <div className="login">
      <SignPage
        formName="login"
        onSubmit={handleSubmit}
        title="Вход"
        buttonText='Войти'
        aria-label="кнопка войти"
      >
        <input
          className="sign-page__input"
          id="email-input" 
          type="email" 
          onChange={handleEmail} 
          value={email || ''}
          name="email" 
          placeholder="Email" 
          minLength="10" 
          maxLength="40" 
          required
        />
        <input
          className="login__input"
          id="passwd-input" 
          type="password" 
          onChange={handlePassword} 
          value={password || ''}
          name="password"
          placeholder="Пароль"
          minLength="10"
          maxLength="20"
          required 
        />
      </SignPage>
    </div>
  )
}