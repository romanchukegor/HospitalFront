import axios from "axios";
import { API_URL } from "src/constants";
import AuthService from "src/services/AuthService";

export default class Store {
  isAuth = false;
  user = null;
  events = [];

  setAuth = (boolean) => {
    this.isAuth = boolean;
    this.publish("isAuth", this.isAuth);
  };

  setUser = (user) => {
    this.user = user;
  };

  subscribe = (eventName, listener) => {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  };

  publish = (eventName, data) => {
    const event = this.events[eventName];
    if (!event || !event.length) {
      return;
    }

    event.forEach((listener) => listener(data));
  };

  login = async (login, password) => {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.accessToken);
      this.setAuth(true);
      this.setUser(response.user);
    } catch (error) {
      console.log(error.response);
      return error.response?.data?.message;
    }
  };

  registration = async (login, password) => {
    try {
      const response = await AuthService.registration(login, password);
      if (!response.error) {
        localStorage.setItem("token", response.accessToken);
        this.setAuth(true);
        this.setUser(response.user);
      }
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  logout = async () => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token", response.accessToken);
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  checkAuth = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await axios.get(`${API_URL}refresh`, {
          withCredentials: true,
        });
        localStorage.removeItem("token", response.accessToken);
        this.setAuth(true);
        this.setUser(response.user);
      } else {
        this.setAuth(false);
        this.setUser({});
      }
    } catch (error) {
      return error.response?.data?.message;
    }
  };
}
