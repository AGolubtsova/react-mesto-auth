import React from 'react';
import { Link } from 'react-router-dom';

export default function SignPage ({formName, onSubmit, title, children, buttonText}) {
  return (
    <div className="sign-page">
        <form
          className="sign-page__form"
          name={formName}
          onSubmit={onSubmit}
        >
          <h2 className="sign-page__title">{title}</h2>
            {children}
          <button
            type="submit"
            className="sign-page__button"
          >
            {buttonText}
          </button>
          {
            formName === "register" &&
            <Link className="sign-page__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
          }
        </form>
    </div>
  )
}