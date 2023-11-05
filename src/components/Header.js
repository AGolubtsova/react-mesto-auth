import React from 'react';
import headerLogo from "../images/logo/logo.svg";
import { Link, Route } from 'react-router-dom';

export default function Header({ loggedIn, email, onSignOut }) {
  return (
    <header className = "header">
      <img src={headerLogo} alt="Логотип проекта Mesto" className="header__logo" />
      <div className = "header__info">
        {loggedIn ? ( // Если пользователь авторизован:
          <>
            <p className = "header__email">{email}</p>
            <Link 
              to='/sign-in' 
              className = {`header__menu-item ${loggedIn && 'header__menu-item_state_active'}`}
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </>
        ) : ( // Если пользователь не авторизован:
          <>
            <Route path='/sign-up'>
              <Link to='/sign-in' className = "header__menu-item">Вход</Link>
            </Route>
            <Route path='/sign-in' >
              <Link to='/sign-up' className = "header__menu-item">Регистрация</Link>
            </Route>
          </>
        )}
      </div>
    </header>
  );
}