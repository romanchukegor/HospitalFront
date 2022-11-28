import api from "../interceptors/axios";

export default class AuthService {
  static async login(login, password) {
    return api
      .post("login", { login, password })
      .then((response) => response.data);
  }

  static async registration(login, password) {
    return api
      .post("registration", { login, password })
      .then((response) => response.data);
  }

  static async logout() {
    return api.get("logout");
  }
}
