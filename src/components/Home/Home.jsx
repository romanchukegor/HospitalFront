import { useState, useContext } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import "./style.scss";

const Home = () => {
  const store = useContext(Context);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logOutUser = async () => {
    const error = await store.logout();

    if (error) {
      setIsError(true);
      setErrorMessage(error);
    }
  };

  return (
    <div className="home">
      <Header title="Приемы">
        <button 
          onClick={logOutUser} 
          type="button" 
          className="home__button">
          Выход
        </button>
      </Header>
      <div className="home-inputs">
        <button type="button">Добавить</button>
      </div>
      {isError && <Error errorMessage={errorMessage} isError={isError} />}
    </div>
  );
};

export default Home;
