import { API_URL } from "src/constants";
import $api from "src/http";

export const addAppointmentService = (appointmentForm) => {
  return $api.post(`${API_URL}/appointments`, {
    ...appointmentForm,
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
