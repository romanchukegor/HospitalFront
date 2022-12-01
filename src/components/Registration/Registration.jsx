import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "src";
import HeaderImage from "src/components/Header/Header";
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

  const handleError = (text) => {
    setIsError(true);
    setErrorMessage(text);
  };

  const handleChange = (value, name) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const registerUser = async () => {
    if (!Validator.checkLogin(user.login)) {
      handleError("Логин должен быть больше 6 символов");
      return;
    }
    if (!Validator.checkPassword(user.password)) {
      handleError("Пароль введен не корректно");
      return;
    }
    if (!Validator.checkEqualPasswords(user.password, user.confirmPassword)) {
      handleError("Пароли не совпадают");
      return;
    }

    const error = await store.registration(user.login, user.password);

    if (error) {
      handleError(error);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-page__header">
        <HeaderImage title={"Зарегистрироваться в системе"} />
      </div>
      <div className="registration-page__body">
        <div>
          <img src={build} alt="" className="registration-page__image" />
        </div>
        <div className="registration-form">
          <div className="registration-form__title">
            Зарегистрироваться в системе
          </div>
          <form className="registration-form__form">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              className={
                !isError
                  ? "registration-form__input"
                  : "registration-form__input_error"
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
                  ? "registration-form__input"
                  : "registration-form__input_error"
              }
              placeholder="Пароль"
              name="password"
              id="password"
              onChange={(event) =>
                handleChange(event.target.value, event.target.name)
              }
            />
            <label htmlFor="confirm-password">Повторите пароль:</label>
            <input
              type="password"
              className={
                !isError
                  ? "registration-form__input"
                  : "registration-form__input_error"
              }
              placeholder="Повторите пароль"
              name="confirm-password"
              id="confirm-password"
              onChange={(event) =>
                handleChange(event.target.value, event.target.name)
              }
            />
          </form>
          <div className="registration-form__buttons">
            <button
              onClick={registerUser}
              className="registration-form__button"
              type="button"
            >
              Зарегестрироваться
            </button>
            <Link to="/authorization">
              <button className="registration-form__authorization-link" type="button">
                Авторизация
              </button>
            </Link>
          </div>
        </div>
      </div>
      {isError && <Error errorMessage={errorMessage} isError={isError} />}
    </div>
  );
};

export default Registration;
