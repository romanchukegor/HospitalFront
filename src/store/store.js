import axios from "axios";
import { API_URL } from "src/constants";
import AuthService from "src/services/AuthService";

export default class Store {
  isAuth = false;
  user = null;
  events = [];

  setAuth = (boolean) => {
    this.isAuth = boolean;
    this.publish(this.isAuth);
  };

  setUser = (user) => {
    this.user = user;
  };

  subscribe = (listener) => {
    if (!this.events) {
      this.events = [];
    }

    this.events.push(listener);
  };

  publish = (data) => {
    const events = this.events;
    
    if (!events || !events.length) {
      return;
    }

    events.forEach((listener) => listener(data));
  };

  login = async (login, password) => {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  registration = async (login, password) => {
    try {
      const response = await AuthService.registration(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  logout = async () => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token", response.data.accessToken);
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  checkAuth = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.removeItem("token", response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
      } else {
        this.setAuth(false);
        this.setUser({});
      }
    } catch (error) {
      return error.response?.data?.message;
    }
  };
}
