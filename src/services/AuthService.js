import $api from "src/http";

export default class AuthService {
  static async login(login, password) {
    const response = await $api.post("/login", { login, password });
    
    return response;
  }

  static async registration(login, password) {
    const response = await $api.post("/registration", { login, password });

    return response;
  }

  static async logout() {
    return $api.get("/logout");
  }
}
