import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div
      className = {`popup popup_zoom-picture ${card.link ? "popup_opened" : ""}`}
    >
      <div className = "popup__container-image">
        <button
          onClick = {onClose}
          className = "popup__close-button"
          type = "button"
        ></button>
        <figure className = "popup__figure">
          <img src = {card.link} alt = {card.name} className = "popup__image" />
          <figcaption className = "popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;