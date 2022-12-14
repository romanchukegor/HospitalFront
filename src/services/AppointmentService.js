import { API_URL } from "../constants";
import $api from "src/http";

export const addAppointmentService = (form) => {
  return $api.post(`${API_URL}/appointments`, {
    ...form,
  });
};

export const getAllAppointmentsService = () => {
  return $api.get(`${API_URL}/appointments`);
};

export const deleteAppointmentService = (_id) => {
  return $api.delete(`${API_URL}/appointments/${_id}`);
};

export const editAppointmentService = (_id, form) => {
  return $api.patch(`${API_URL}/appointments/${_id}`, {
    ...form,
  });
};
