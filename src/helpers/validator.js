// we use default to export only the class.
export default class Validator {
  // we use static to store data at the class level.
  static checkEqualPasswords(password, repeatedPassword) {
    return repeatedPassword !== password;
  }
  static checkLogin(login) {
    return login.trim().length > 6;
  }
  static checkPassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g.test(
      password
    );
  }
}




