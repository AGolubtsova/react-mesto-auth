import React, { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Api from '../utils/Api';

function App() {
  // Стейты
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // Редактирование аватара
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Редактирование профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // Добавление карточки
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({card: {}, isOpen: false});
  const [selectedCard, setSelectedCard] = useState({});  // Передача данных при увеличении изображения
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Рендер карточек и данных пользователя
  useEffect(() => {
    Api.getAllNeededData()
      .then(([items, user]) => {
        setCards(items);
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Обработчик для увеличения изображения
  const handleCardClick = (card) => {
      setSelectedCard(card);
  };

  // Обработчик лайков карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDeleteRequest(card) {
    setIsConfirmPopupOpen({ card, isOpen: true });
  }

  // Обработчик удаления карточки
  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        setIsConfirmPopupOpen({ card: {}, isOpen: false });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // Обработчик данных пользователя
  function handleUpdateUser(data) {
    Api.sendUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // Обработчик изменения аватара
  function handleUpdateAvatar(avatar) {
    Api.handleUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Обработчик добавления карточки
  function handleAddPlaceSubmit(data) {
    Api.createNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // Функция для закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsConfirmPopupOpen({ card: {}, isOpen: false });
  };

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }
  
  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }
  
  useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('mousedown', handleOverlayClose);
  
    return () => {
      window.removeEventListener('keydown', handleEscClose);
      window.removeEventListener('mousedown', handleOverlayClose);
    };
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className = "page">
        <Header />
        <Main 
          onEditAvatar = {handleEditAvatarClick}
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDeleteRequest={handleCardDeleteRequest}
          cards = {cards}
        />
        <Footer />
        <EditProfilePopup 
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopups}
          onUpdateUser = {handleUpdateUser}
        />
        <EditAvatarPopup 
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
        /> 
        <AddPlacePopup 
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onUpdatePlace = {handleAddPlaceSubmit}
        /> 
        <ConfirmPopup
          card = {isConfirmPopupOpen.card}
          isOpen = {isConfirmPopupOpen.isOpen}
          onClose = {closeAllPopups}
          onDelete = {handleCardDelete}
        />
        <ImagePopup  card = {selectedCard} onClose = {closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;