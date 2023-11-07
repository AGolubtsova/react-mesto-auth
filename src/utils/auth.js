export const BASE_URL = 'https://auth.nomoreparties.co'

// Метод обработки ответа сервера
const handleResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

// Универсальная функция запроса с проверкой ответа
function request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(handleResponse)
  }

// Метод регистрации пользователя
export const register = (password, email) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password: password, email: email})
  })
}

export const authorize = (password, email) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password: password, email: email})
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token)
      return data.token
    }
  })
}

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
}