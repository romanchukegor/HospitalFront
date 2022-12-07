import { API_URL } from "../constants";
import axios from "axios";

export const addAppointmentService = (name, doctor, date, complaint) =>
  axios.post(`${API_URL}/appointments`, {
    name,
    doctor,
    date,
    complaint,
  });

export const getAllAppointmentsService = () =>
  axios.get(`${API_URL}/appointments`);
