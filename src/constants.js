export const API_URL = "http://localhost:8000/api";

export const regexForPassword = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
  "i"
);

export const tableHeadlines = ["Имя", "Врач", "Дата", "Жалобы"];

export const sortSelectValues = [
  { value: "", name: "--Выберите свойство--" },
  { value: "name", name: "По имени" },
  { value: "doctor", name: "По врачу" },
  { value: "date", name: "По дате" },
  { value: "complaint", name: "По жалобе" },
];

export const sortDirectionValues = [
  { value: "byAscending", name: "По возрастанию" },
  { value: "byDescending", name: "По убыванию" },
];

export const doctors = [
  { value: "", name: "--Выберите доктора--" },
  { value: "Komarov", name: "А.Е Комаров" },
  { value: "Aibolit", name: "И.С Айболит" },
  { value: "Ivanov", name: "С.Ю Иванов" },
  { value: "Petrov", name: "И.И Петров" },
];
