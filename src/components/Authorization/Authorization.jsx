import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "index";
import Error from "components/Error/Error";
import HeaderImage from "components/Header/Header";
import Helpers from "helpers/helpers";
import build from "images/Build.svg";
import "./style.scss";

const Authorization = () => {
  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const store = useContext(Context);

  const userSignIn = async () => {
    if (Helpers.checkLogin(user.login)) {
      setIsError(true);
      setErrorMessage("Поле для логина должно быть больше 6 символов");
    } else if (!Helpers.checkPassword(user.password)) {
      setIsError(true);
      setErrorMessage("Пароль веден не корректно");
    } else {
      const error = await store.login(user.login, user.password);

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
        <HeaderImage title={"Войти в систему"} />
      </div>
      <div className="authentication-page__body">
        <div>
          <img src={build} alt="" className="authentication-page__image" />
        </div>
        <div className="authorization-form">
          <div className="authorization-form__title">Войти в систему</div>
          <form className="authorization-form__login">
            <label>Логин:</label>
            <input
              type="text"
              className={
                !isError
                  ? "authorization-form__input"
                  : "authorization-form__input__error"
              }
              placeholder="Логин"
              name="login"
              onChange={handleChange}
            />
          </form>
          <form className="authorization-form__password">
            <label>Пароль:</label>
            <input
              type="password"
              className={
                !isError
                  ? "authorization-form__input"
                  : "authorization-form__input__error"
              }
              placeholder="Пароль"
              name="password"
              onChange={handleChange}
            />
          </form>
          <div className="authorization-form__buttons">
            <button
              className="authorization-form__button"
              onClick={userSignIn}
              type="button"
            >
              Войти
            </button>
            <Link to="/registration">
              <button className="registration-link" type="button">
                Регистрация
              </button>
            </Link>
          </div>
        </div>
      </div>
      {isError && <Error errorMessage={errorMessage} isError={isError} />}
    </div>
  );
};

export default Authorization;
