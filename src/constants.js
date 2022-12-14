export const API_URL = "http://localhost:8000/api";

export const regexForPassword = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
  "i"
);

export const tableHeadlines = ["Имя", "Врач", "Дата", "Жалобы"];

export const doctors = [
  { value: "", name: "--Выберите доктора--" },
  { value: "Komarov", name: "А.Е Комаров" },
  { value: "Aibolit", name: "И.С Айболит" },
  { value: "Ivanov", name: "С.Ю Иванов" },
  { value: "Petrov", name: "И.И Петров" },
];
