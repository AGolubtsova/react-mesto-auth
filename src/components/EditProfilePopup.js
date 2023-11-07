import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }      

  return (
    <PopupWithForm 
      title = "Редактировать профиль"
      name = "profile-edit"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input 
        type = "text"
        className = "popup__input popup__input_type_name"
        name = "username"
        id = "userName-input"
        placeholder = "Имя"
        required
        minLength = "2"
        maxLength = "40"
        value = {name || ''}
        onChange = {handleChangeName}
      />
      <span className = "popup__input-error" id="username-error"></span>
      <input 
        type = "text"
        className ="popup__input popup__input_type_job"
        name="profession"
        id="userProf-input"
        placeholder="Профессия"
        required 
        minLength="2"
        maxLength="400"
        value = {description || ''}
        onChange = {handleChangeDescription}
      />
      <span className = "popup__input-error" id="profession-error"></span>
    </PopupWithForm>
  );
}