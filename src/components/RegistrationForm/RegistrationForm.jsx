import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import { regexForPassword } from "src/constants";
import { checkStringByRegex, checkStringLength, checkStringsEquals } from "src/helpers/validator";
import build from "src/images/build.svg";
import "./style.scss";

const RegistrationForm = () => {
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
    if (!checkStringLength(user.login, 6)) {
      handleError("Логин должен быть больше 6 символов");
      return;
    }

    if (!checkStringByRegex(regexForPassword, user.password)) {
      handleError("Пароль введен не корректно");
      return;
    }

    if (!checkStringsEquals(user.password, user.confirmPassword)) {
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
    <div className="registration">
      <div className="registration-header">
        <Header title={"Зарегистрироваться в системе"} />
      </div>
      <div className="registration-body">
        <div className="registration-body__image">
          <img 
            src={build} 
            alt="" 
            className="registration-body-form__image" 
          />
        </div>
        <div className="registration-body-form">
          <div className="registration-body-form__title">
            Зарегистрироваться в системе
          </div>
          <div className="registration-body-form-inputs">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              className={
                !isError
                  ? "registration-body-form-inputs__input"
                  : "registration-body-form-inputs__input_error"
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
                  ? "registration-body-form-inputs__input"
                  : "registration-body-form-inputs__input_error"
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
                  ? "registration-body-form-inputs__input"
                  : "registration-body-form-inputs__input_error"
              }
              placeholder="Повторите пароль"
              name="confirmPassword"
              id="confirmPassword"
              onChange={(event) =>
                handleChange(event.target.value, event.target.name)
              }
            />
          </div>
          <div className="registration-body-form-buttons">
            <button
              onClick={registerUser}
              className="registration-body-form-buttons__button"
              type="button"
            >
              Зарегистрироваться
            </button>
            <Link to="/authorization" className="registration-body-form-buttons__authorization-link">
              <button type="button">
                Авторизация
              </button>
            </Link>
          </div>
        </div>
      </div>
      {isError && 
        <Error errorMessage={errorMessage} isError={isError} />
      }
    </div>
  );
};

export default RegistrationForm;
