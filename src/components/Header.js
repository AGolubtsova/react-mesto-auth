import React from 'react';
import headerLogo from "../images/logo/logo.svg";
import { Link } from 'react-router-dom';

export default function Header({ loggedIn, email, url, title, onSignOut }) {
  return (
    <header className = "header">
      <img src={headerLogo} alt="Логотип проекта Mesto" className="header__logo" />
      <div className = "header__info">
          <>
            <p className = "header__email">{email}</p>
            <Link 
              to={url} 
              className = "header__menu-item header__menu-item_state_active"
              onClick={onSignOut}
            >
              {title}
            </Link>
          </>
      </div>
    </header>
  );
}