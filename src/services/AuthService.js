import api from "../interceptors/axios";

export default class AuthService {
  static async login(login, password) {
    const response = await api.post("login", { login, password });
    return response.data;
  }

  static async registration(login, password) {
    const response = await api.post("registration", { login, password });
    return response.data;
  }

  static async logout() {
    return api.get("logout");
  }
}
