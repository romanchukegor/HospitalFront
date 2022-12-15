export const checkStringsEquals = (string, repeatedString) => {
  return repeatedString === string;
};

export const checkStringLength = (string, number) => {
  return string.trim().length > number;
};

export const checkStringByRegex = (regex, string) => {
  return regex.test(string);
};
