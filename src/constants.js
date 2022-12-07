export const API_URL = "http://localhost:8000/api";
export const regexForPassword = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
  "i"
);
export const list = ["Имя", "Врач", "Дата", "Жалобы"]
