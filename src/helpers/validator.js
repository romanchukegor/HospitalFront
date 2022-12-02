// we use default to export only the class.
export default class Validator {
  // we use static to store data at the class level.
  static checkStringsEquals(string, repeatedString) {
    return repeatedString === string;
  }

  static checkStringLength(string, number) {
    return string.trim().length > number;
  }

  static checkStringByRegex(regex, string) {
    return regex.test(string);
  }
}






