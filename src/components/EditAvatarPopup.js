import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef(); // Реф для аватара

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  useEffect(() => {avatarRef.current.value = '' }, [isOpen]);// Эффект для очистки формы
    
  return (
    <PopupWithForm
      title = "Обновить аватар"
      name = "avatar-edit"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >   
      <input 
        type = "url" 
        className = "popup__input popup__input_type_avatar" 
        name = "userAvatar" 
        id = "userAvatar-input" 
        placeholder = "Ссылка на картинку"
        required
        ref = {avatarRef}
      />
      <span className = "popup__input-error" id="userAvatar-error"></span>  
    </PopupWithForm>
  );

}