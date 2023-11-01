import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ card, isOpen, onClose, onDelete }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDelete(card);
  }

  return (
    <PopupWithForm
      name = "delete"
      title = "Вы уверены?"
      buttonText = "Да"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
    >
    </PopupWithForm>
  )
}

export default ConfirmPopup;
          
   