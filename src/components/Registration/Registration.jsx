import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import HeaderImage from "components/HeaderImage/HeaderImage";
import Build from "images/Build.svg";
import Error from "components/Error/Error";
import { Context } from "../..";
import "./style.scss";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { store } = useContext(Context);

  const userRegistration = async () => {
    if (login === "" || password === "" || repeatedPassword === "") {
      setIsError(true);
      setErrorMessage("Все поля должны быть заполнены");

      if (password !== repeatedPassword) {
        setIsError(true);
        setErrorMessage("Пароли не совпадают");
      }

      if (login.length < 6 || password.length < 6) {
        setIsError(true);
        setErrorMessage("Логин и пароль должны быть больше 6 символов");
      }
    } else {
      const response = await store.registration(login, password);

      if (response.error) {
        setErrorMessage("Ошибка регистрации");
      }
    }
  };

  return (
    <div className="user-form">
      <div className="user-form__header">
        <HeaderImage />
        <div className="user-form__title">Зарегистрироваться в системе</div>
      </div>
      <div className="user-form__body">
        <div>
          <img src={Build} alt="" className="user-form__image"/>
        </div>
        <div className="registration">
          <div className="registration__title">
            Зарегистрироваться в системе
          </div>
          <div>
            <p>Логин:</p>
            <input
              type="text"
              className={!isError ? "registration__input" : "registration__input__error"}
              placeholder="Логин"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div>
            <p>Пароль:</p>
            <input
              type="password"
              className={!isError ? "registration__input" : "registration__input__error"}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p>Повторите пароль:</p>
            <input
              type="password"
              className={!isError ? "registration__input" : "registration__input__error"}
              placeholder="Пароль"
              onChange={(e) => setRepeatedPassword(e.target.value)}
            />
          </div>
          <button
            onClick={userRegistration}
            className="registration__button"
            type="button"
          >
            Зарегестрироваться
          </button>
          <div>
            <Link to="/authorization">
              <button className="authorization-link" type="button">
                Войти
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
