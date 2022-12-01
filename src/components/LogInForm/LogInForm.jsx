import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "src";
import { regexForPassword } from "src/constants";
import Error from "src/components/Error/Error";
import Header from "src/components/Header/Header";
import Validator from "src/helpers/validator";
import build from "src/images/build.svg";
import "./style.scss";

const LogInForm = () => {
  const [user, setUser] = useState({
    login: "",
    password: "",
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

  const logInUser = async () => {
    if (!Validator.checkStringLength(user.login, 6)) {
      handleError("Поле для логина должно быть больше 6 символов");
      return;
    }

    if (!Validator.checkRegex(regexForPassword, user.password)) {
      handleError("Пароль веден не корректно");
      return;
    }

    const error = await store.login(user.login, user.password);

    if (error) {
      handleError(error);
      return;
    }
  };

  return (
    <div className="authorization-page">
      <div className="authorization-page__header">
        <Header title={"Войти в систему"} />
      </div>
      <div className="authorization-page__body">
        <div>
          <img 
            src={build} 
            alt="" 
            className="authorization-page__image" />
        </div>
        <div className="authorization-page__authorization-form">
          <div className="authorization-page__authorization-form__title">
            Войти в систему
          </div>
          <form className="authorization-page__authorization-form__submit">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              className={
                !isError
                  ? "authorization-page__authorization-form__input"
                  : "authorization-page__authorization-form__input_error"
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
                  ? "authorization-page__authorization-form__input"
                  : "authorization-page__authorization-form__input_error"
              }
              placeholder="Пароль"
              name="password"
              id="password"
              onChange={(event) =>
                handleChange(event.target.value, event.target.name)
              }
            />
            <div className="authorization-page__authorization-form__buttons">
              <button
                className="authorization-page__authorization-form__button"
                onClick={logInUser}
                type="button"
              >
                Войти
              </button>
              <Link to="/registration">
                <button
                  className="authorization-page__authorization-form__registration-link"
                  type="button"
                >
                  Регистрация
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

export default LogInForm;
