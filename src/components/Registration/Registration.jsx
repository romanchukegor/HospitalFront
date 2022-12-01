import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "src";
import { regexForPassword } from "src/constants";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import Validator from "src/helpers/validator";
import build from "src/images/build.svg";
import "./style.scss";

const Registration = () => {
  const [user, setUser] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const store = useContext(Context);
console.log(user.confirmPassword)
  const handleError = (text) => {
    setIsError(true);
    setErrorMessage(text);
  };

  const handleChange = (value, name) => {
    console.log(name)
    setUser({
      ...user,
      [name]: value,
    });
  };

  const registerUser = async () => {
    if (!Validator.checkStringLength(user.login, 6)) {
      handleError("Логин должен быть больше 6 символов");
      return;
    }

    if (!Validator.checkRegex(regexForPassword, user.password)) {
      handleError("Пароль введен не корректно");
      return;
    }

    if (!Validator.checkEquals(user.password, user.confirmPassword)) {
      handleError("Пароли не совпадают");
      return;
    }

    const error = await store.registration(user.login, user.password);

    if (error) {
      handleError(error);
      return;
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-page__header">
        <Header title={"Зарегистрироваться в системе"} />
      </div>
      <div className="registration-page__body">
        <div>
          <img 
            src={build} 
            alt="" 
            className="registration-page__image" />
        </div>
        <div className="registration-page__registration-form">
          <div className="registration-page__registration-form__title">
            Зарегистрироваться в системе
          </div>
          <form className="registration-page__registration-form__submit">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              className={
                !isError
                  ? "registration-page__registration-form__input"
                  : "registration-page__registration-form__input_error"
              }
              placeholder="Логин"
              name="login"
              id="login"
              onChange={(event) =>
                handleChange(event.target.value, event.target.name)
              }
            />
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              className={
                !isError
                  ? "registration-page__registration-form__input"
                  : "registration-page__registration-form__input_error"
              }
              placeholder="Пароль"
              name="password"
              id="password"
              onChange={(event) =>
                handleChange(event.target.value, event.target.name)
              }
            />
            <label htmlFor="confirmPassword">Повторите пароль:</label>
            <input
              type="password"
              className={
                !isError
                  ? "registration-page__registration-form__input"
                  : "registration-page__registration-form__input_error"
              }
              placeholder="Повторите пароль"
              name="confirmPassword"
              id="confirmPassword"
              onChange={(event) =>
                handleChange(event.target.value, event.target.name)
              }
            />
            <div className="registration-page__registration-form__buttons">
            <button
              onClick={registerUser}
              className="registration-page__registration-form__button"
              type="button"
            >
              Зарегестрироваться
            </button>
            <Link to="/authorization">
              <button className="registration-page__registration-form__authorization-link" type="button">
                Авторизация
              </button>
            </Link>
          </div>
          </form>
        </div>
      </div>
      {isError && <Error errorMessage={errorMessage} isError={isError} />}
    </div>
  );
};

export default Registration;
