import axios from "axios";
import { API_URL } from "interceptors/axios";
import AuthService from "services/AuthService";

export default class Store {
  isAuth = false;
  apiErrorMessage = "";
  isApiError = false;
  user = {};
  channels = {};

  setAuth = (bool) => {
    this.isAuth = bool;
    this.publish("isAuth", this.isAuth);
  };

  setUser = (user) => {
    this.user = user;
  };

  subscribe(channelName, listener) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }

    this.channels[channelName].push(listener);
  }

  publish(channelName, data) {
    const channel = this.channels[channelName];
    if (!channel || !channel.length) {
      return;
    }
    
    channel.forEach((listener) => listener(data));
  }

  login = async (login, password) => {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.accessToken);
      this.setAuth(true);
      this.setUser(response.user);
      return response;
    } catch (error) {
      return error;
    }
  };

  registration = async (login, password) => {
    try {
      const response = await AuthService.registration(login, password);
      console.log(response)
      if(!response.error) {
      localStorage.setItem("token", response.accessToken);
      this.setAuth(true);
      this.setUser(response.user);
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  logout = async () => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token", response.accessToken);
      this.setAuth(false);
      this.setUser({});
      return response;
    } catch (error) {
      return error;
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
        return response;
      }
    } catch (error) {
      return error;
    }
  };
}
