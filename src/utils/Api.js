//class Api {constructor{}getInitialCards(){}}

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getAppInfo() {
    return Promise.all([this.getCard(), this.getUserInfo()]);
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
  getCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleServerResponse);
  }
  editAvatarInfo(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleServerResponse);
  }
  newPost(name, link) {
    return fetch(`${this._baseUrl}//cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleServerResponse);
  }
}

// GET https://around-api.en.tripleten-services.com/v1/users/me // also remember to pass the token
export default Api;
