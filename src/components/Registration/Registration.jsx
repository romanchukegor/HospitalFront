import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "index";
import HeaderImage from "components/Header/Header";
import build from "images/Build.svg";
import Error from "components/Error/Error";
import Helpers from "helpers/helpers";
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

  const userRegistration = async () => {
    if (Helpers.checkLogin(user.login)) {
      setIsError(true);
      setErrorMessage("Логин должен быть больше 6 символов");
    } else if (!Helpers.checkPassword(user.password)) {
      setIsError(true);
      setErrorMessage("Пароль введен не корректно");
    } else if (
      !Helpers.checkEqualPasswords(user.password, user.confirmPassword)
    ) {
      setIsError(true);
      setErrorMessage("Пароли не совпадают");
    } else {
      const error = await store.registration(user.login, user.password);

      if (error) {
        setIsError(true);
        setErrorMessage(error);
      }
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  return (
    <div className="authentication-page">
      <div className="authentication-page__header">
        <HeaderImage title={"Зарегистрироваться в системе"} />
      </div>
      <div className="authentication-page__body">
        <div>
          <img src={build} alt="" className="authentication-page__image" />
        </div>
        <div className="registration-form">
          <div className="registration-form__title">
            Зарегистрироваться в системе
          </div>
          <div>
            <p>Логин:</p>
            <input
              type="text"
              className={
                !isError
                  ? "registration-form__input"
                  : "registration-form__input__error"
              }
              placeholder="Логин"
              name="login"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Пароль:</p>
            <input
              type="password"
              className={
                !isError
                  ? "registration-form__input"
                  : "registration-form__input__error"
              }
              placeholder="Пароль"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Повторите пароль:</p>
            <input
              type="password"
              className={
                !isError
                  ? "registration-form__input"
                  : "registration-form__input__error"
              }
              placeholder="Повторите пароль"
              name="confirm-password"
              onChange={handleChange}
            />
          </div>
          <div className="registration-form__buttons">
            <button
              onClick={userRegistration}
              className="registration-form__button"
              type="button"
            >
              Зарегестрироваться
            </button>
            <Link to="/authorization">
              <button className="authorization-link" type="button">
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
