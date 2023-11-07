import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import success from '../images/success.svg';
import error from '../images/error.svg';

import Api from '../utils/Api';
import * as auth from '../utils/auth';

function App() {
  // Стейты
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // Редактирование аватара
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Редактирование профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // Добавление карточки
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({card: {}, isOpen: false});
  const [selectedCard, setSelectedCard] = useState({});  // Передача данных при увеличении изображения
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //Переменная для отслеживания состояния загрузки во время ожидания ответа от сервера

  const [loggedIn, setLoggedIn] = useState(false); //Состояние авторизации
  const [email, setEmail] = useState(''); //Хранение и передача почты
  const [message, setMessage] = useState({ imgPath: '', text: '' });
  const navigate = useNavigate();//useHistory
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false); //Состояние Tooltip

  // Рендер карточек и данных пользователя
  useEffect(() => {
    Api.getAllNeededData()
      .then(([items, user]) => {
        setCards(items);
        setCurrentUser(user);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        }
      })
      .catch(console.error)
    }
  };

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
      .catch(console.error);
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
        setIsLoading(true);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Обработчик изменения аватара
  function handleUpdateAvatar(avatar) {
    Api.handleUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        setIsLoading(true);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Обработчик добавления карточки
  function handleAddPlaceSubmit(data) {
    Api.createNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        setIsLoading(true);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
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
    setIsInfoTooltipOpen(false);
  };

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoTooltipOpen

  useEffect(() => {
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
    if(isOpen) { // навешиваем только при открытии
         window.addEventListener('keydown', handleEscClose);
         window.addEventListener('mousedown', handleOverlayClose);
      return () => {
          window.removeEventListener('keydown', handleEscClose);
          window.removeEventListener('mousedown', handleOverlayClose);
      }
    }
  }, [isOpen]) 


  // Функция авторизации пользователя (при неудаче всплывает popup через Tooltip)
  const handleLogin = (password, email) => {
    return auth.authorize(password, email)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        setEmail(email);
        localStorage.setItem('jwt', res);
        navigate("/", { replace: true });
      };
    })
    .catch( (err) => { 
      console.log(`Возникла ошибка при авторизации, ${err}`);
      setIsInfoTooltipOpen(true); 
    })
  }

  // Функция регистрации пользователя (всплывает popup через Tooltip)
  const handleRegister = (password, email) => {
    return auth.register(password, email)
      .then((res) => {
        setEmail(res.data.email);
        setMessage({ imgPath: success, text: 'Вы успешно зарегистрировались!' });
        navigate("/sign-in", { replace: true });
      })
      .catch(() => setMessage({ imgPath: error, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
    setEmail(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className = "page">
        <Routes>
          <Route path="/sign-up" element={
            <>
              <Header title="Войти" url="/sign-in" />
              <Register onRegister={handleRegister} onClose={closeAllPopups} isInfoTooltipOpen={isInfoTooltipOpen} />
            </>}
          />
          <Route path="/sign-in" element={ 
             <> 
               <Header title="Регистрация" url="/sign-up" /> 
               <Login onLogin={handleLogin} onClose = {closeAllPopups}/> 
             </>}
          />
          <Route path="/" element={
            <>
              <Header title="Выйти" url="/sign-in" onSignOut={onSignOut} email={email}/>
              <ProtectedRoute 
                loggedIn={loggedIn} 
                component={Main}
                cards = {cards}
                onEditAvatar = {handleEditAvatarClick}
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddPlaceClick}
                onCardClick = {handleCardClick}
                onCardLike = {handleCardLike}
                onCardDeleteRequest={handleCardDeleteRequest}
                isLoading = {isLoading} />
               
            </>}
          /> 
        </Routes>
        <Footer />
        <InfoTooltip
          name='tooltip'
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={message.text}
          imgPath={message.imgPath}
        />
        <EditProfilePopup 
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopups}
          onUpdateUser = {handleUpdateUser}
          isLoading = {isLoading}
        />
        <EditAvatarPopup 
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
          isLoading = {isLoading}
        /> 
        <AddPlacePopup 
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onUpdatePlace = {handleAddPlaceSubmit}
          isLoading = {isLoading}
        /> 
        <ConfirmPopup
          card = {isConfirmPopupOpen.card}
          isOpen = {isConfirmPopupOpen.isOpen}
          onClose = {closeAllPopups}
          onDelete = {handleCardDelete}
        />
        <ImagePopup  card = {selectedCard} onClose = {closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;