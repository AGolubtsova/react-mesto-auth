import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onUpdatePlace, isLoading }) {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }
    
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  useEffect(() => {
    setLink('');
    setName('');
  }, [isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdatePlace({
      name: name,
      link: link,
    });
  }

  return (

    <PopupWithForm
      title = "Новое место"
      name = "card-add"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
      buttonText = {isLoading ? 'Создание...' : "Создать"} 
    >
      <input 
        type = "text"
        className = "popup__input popup__input_type_place"
        name = "name"
        id = "placeName-input"
        placeholder = "Название"
        minLength = "2"
        maxLength = "30"
        required
        value = {name}
        onChange = {handleChangeName}
      />
      <span className = "popup__input-error" id = "name-error"></span>
      <input 
        type = "url" 
        className = "popup__input popup__input_type_src"
        name = "link"
        id = "placeLink-input"
        placeholder = "Ссылка на картинку"
        required
        value = {link}
        onChange = {handleChangeLink}
      />
      <span className = "popup__input-error" id="link-error"></span>
    </PopupWithForm>
  );
}