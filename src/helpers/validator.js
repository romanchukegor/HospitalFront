import moment from "moment";

export const checkStringsEquals = (string, repeatedString) => {
  return repeatedString === string;
};

export const checkStringLength = (string, number) => {
  return string.trim().length > number;
};

export const checkStringByRegex = (regex, string) => {
  return regex.test(string);
};

export const checkInputByEmptiness = (string) => {
  return string !== "";
};

export const changeFormatDate = (date, format) => {
  return moment(date).format(format);
};


