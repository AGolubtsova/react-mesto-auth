import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main ({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDeleteRequest }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
        <>
          <main>
            <section className = "profile">
              <div className = "profile__info">
                <div className = "profile__avatar-area">
                  <img 
                    className = "profile__avatar" 
                    src = {avatar}
                    alt = "фотография пользователя"
                  />
                  <button 
                    type = "button" 
                    className = "profile__avatar-edit-button"
                    onClick = {onEditAvatar}
                  >
                  </button>
                </div>  
                <div className = "profile__content">
                  <div className = "profile__row">
                    <h1 className = "profile__title">{name}</h1>
                    <button 
                      type = "button" 
                      className = "profile__edit-button" 
                      aria-label = "Редактировать форму"
                      onClick = {onEditProfile}
                    >
                    </button>
                  </div>
                    <p className = "profile__description">{about}</p>
                </div>
              </div>
              <button 
                type = "button" 
                className = "profile__add-button"
                onClick = {onAddPlace}
              >
              </button>
            </section>
            <section className = "elements">
              {
                cards.map((card) => (
                <Card 
                  key = {card._id} 
                  card = {card} 
                  onCardClick = {onCardClick}
                  onCardLike = {onCardLike}
                  onCardDeleteRequest = {onCardDeleteRequest}
                />)
              )}
            </section>
          </main>  
        </>    
    );
}

export default Main;