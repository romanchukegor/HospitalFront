import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Error from "components/Error/Error";
import { Context } from "../..";
import HeaderImage from "components/HeaderImage/HeaderImage";
import Build from "images/Build.svg";
import "./style.scss";

const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { store } = useContext(Context);

  const userLogin = async () => {
    if (login === "" || password === "") {
      setIsError(true);
      setErrorMessage("Все поля должны быть заполнены");
    } else {
      const response = await store.login(login, password);

      if (!response.data) {
        setErrorMessage("Ошибка входа");
      }
    }
  };

  return (
    <div className="user-form">
      <div className="user-form__header">
        <HeaderImage />
        <div className="user-form__title">Войти в систему</div>
      </div>
      <div className="user-form__body">
        <div>
          <img src={Build} alt="" className="user-form__image" />
        </div>
        <div className="authorization">
          <div className="authorization__title">Войти в систему</div>
          <div>
            <p>Логин:</p>
            <input
              type="text"
              className={
                !isError
                  ? "authorization__input"
                  : "authorization__input__error"
              }
              placeholder="Логин"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div>
            <p>Пароль:</p>
            <input
              type="password"
              className={
                !isError
                  ? "authorization__input"
                  : "authorization__input__error"
              }
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="authorization__button"
              onClick={userLogin}
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
