import React from 'react';

export default function InfoTooltip({ isOpen, onClose, title, imgPath }) {
  return (
    <div className = {`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className = "popup__container popup__container_type_tooltip">
        <img className ="popup__image_type_tooltip"  src={imgPath} alt={imgPath} />
        <h2 className = "popup__title popup__title_type_tooltip">{title}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        >
        </button>
      </div>
    </div>
  )
}