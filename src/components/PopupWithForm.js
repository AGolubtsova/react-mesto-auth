import React from 'react';

function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit, buttonText }) {
  return (
    <div
      className = {`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className = "popup__container">
        <button 
          type = "button" 
          className = "popup__close-button" 
          onClick = {onClose}
        ></button>
        <h2 className = "popup__title">{title}</h2>
        <form 
          className={`popup__form popup__form_type_${name}`} 
          onSubmit = {onSubmit} 
        >
          <fieldset className = "popup__fieldset"> {children}</fieldset>
          <button
            className = "popup__submit"
            type = "submit"
          >
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;