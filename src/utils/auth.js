const auth = new Api({
  baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
});

class Api {
  register(email, password) {
    return this._makeRequest("/signup", "POST", { email, password });
  }

  login(email, password) {
    return this._makeRequest("/signin", "POST", { email, password });
  }
}

export default auth;
