class UsersApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _getResponseData(res) {
    return (!res.ok) ?
      Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
      :
      res.json();
  }
  getUsers() {
    return fetch(`${this._baseUrl}/users?page=2`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
  }
  setLike(currentUserId, user) {
    return fetch(`${this._baseUrl}/users/${user.id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: '+7 (954) 333-44-55',
        id: user.id,
        like: currentUserId,
      })
    })
    .then(this._getResponseData)
  }
  removeLike(user) {
    return fetch(`${this._baseUrl}/users/${user.id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: '+7 (954) 333-44-55',
        id: user.id,
        like: '',
      })
    })
    .then(this._getResponseData)
  }
}
export const usersApi = new UsersApi({
  baseUrl: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json'
  }
})