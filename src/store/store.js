import axios from "axios";
import { logIn, registration, logout } from "src/services/AuthService";
import {
  addAppointmentService,
  getAllAppointmentsService,
} from "src/services/AppointmentService";
import { API_URL } from "src/constants";

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

  userLogin = async (login, password) => {
    try {
      const response = await logIn(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  userRegistration = async (login, password) => {
    try {
      const response = await registration(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  userLogout = async () => {
    try {
      const response = await logout();
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
        localStorage.setItem("token", response.data.accessToken);
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

  getAllAppointments = async () => {
    try {
      const response = await getAllAppointmentsService();
      return response;
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  addAppointment = async (appointmentForm) => {
    try {
      const response = await addAppointmentService(appointmentForm);
      return response;
    } catch (error) {
      return error.response?.data?.message;
    }
  };
}
