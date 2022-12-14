import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Error from "src/components/Error/Error";
import Header from "src/components/Header/Header";
import { Context } from "src";
import { regexForPassword } from "src/constants";
import { checkStringByRegex, checkStringLength } from "src/helpers/validator";
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
    if (!checkStringLength(user.login, 6)) {
      handleError("Поле для логина должно быть больше 6 символов");
      return;
    }

    if (!checkStringByRegex(regexForPassword, user.password)) {
      handleError("Пароль веден не корректно");
      return;
    }

    const error = await store.userLogin(user.login, user.password);

    if (error) {
      handleError(error);
      return;
    }
  };

  return (
    <div className="login">
      <div className="login-header">
        <Header title={"Войти в систему"} />
      </div>
      <div className="login-body">
        <div>
          <img src={build} alt="" className="login-body__image" />
        </div>
        <div className="login-body-form">
          <div className="login-body-form__title">Войти в систему</div>
          <div className="login-body-form-inputs">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              className={
                !isError
                  ? "login-body-form-inputs__input"
                  : "login-body-form-inputs__input_error"
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
                  ? "login-body-form-inputs__input"
                  : "login-body-form-inputs__input_error"
              }
              placeholder="Пароль"
              name="password"
              id="password"
              onChange={(event) =>
                handleChange(event.target.value, event.target.name)
              }
            />
          </div>
          <div className="login-body-form-buttons">
            <button
              className="login-body-form-buttons__button"
              onClick={logInUser}
              type="button"
            >
              Войти
            </button>
            <Link
              to="/registration"
              className="login-body-form-buttons__registration-link"
            >
              <button type="button">Регистрация</button>
            </Link>
          </div>
        </div>
      </div>
      {isError && (
        <Error
          errorMessage={errorMessage}
          isError={isError}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};

export default LogInForm;
