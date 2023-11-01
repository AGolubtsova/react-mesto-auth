class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
      }

    // Метод обработки ответа сервера
    _sendRequest(url, options) {
        return fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
  
          throw new Error("Ошибка");
        })
    }

    // Метод инициализации карточек с сервера
    getCards() {
      return this._sendRequest(`${this._url}/cards`, {
            headers: this._headers
        });
    }

    // Метод добавления новой карточки на сервер
    createNewCard({name, link}) {
        return this._sendRequest(`${this._url}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
        });
    }

    // Метод удаления карточки с сервера
    deleteCard(id) {
        return this._sendRequest(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        });
    }

    // Метод оплучения информации о пользователе с сервера
    getUserInfo() {
        return this._sendRequest(`${this._url}/users/me`, {
          headers: this._headers
        });
    }

    // Метод отправки данных пользователя на сервер
    sendUserInfo(userData) {
        return this._sendRequest(`${this._url}/users/me`, {
          headers: this._headers,
          method: 'PATCH',
          body: JSON.stringify({ 
            name: userData.name, 
            about: userData.about 
          })
        });
    }
    
    addCardLike(id) {
        return this._sendRequest(`${this._url}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
      return this._sendRequest(`${this._url}/cards/${cardId}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers,
      })
    }

    handleUserAvatar(data) {
        return this._sendRequest(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: data.avatar,
          })
        })
    }

    getAllNeededData() {
        return Promise.all([this.getCards(), this.getUserInfo()])
    }
}

// Объявление экземпляра API
const optionsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75', 
  headers: {
  authorization: '70f8a693-b9dd-448d-93df-9935ed4791fc',
        'Content-Type': "application/json"
  }
}
const api = new Api(optionsApi);
export default api;