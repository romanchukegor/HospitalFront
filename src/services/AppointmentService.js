import { API_URL } from "../constants";
import $api from "src/http";

export const addAppointmentService = (appointmentForm) => {
  return $api.post(`${API_URL}/appointments`, {
    ...appointmentForm,
  });
};

export const getAllAppointmentsService = () => {
  return $api.get(`${API_URL}/appointments`);
};
