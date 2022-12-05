import { useState, useContext } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";

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
    <div>
      <Header title={"Приемы"}>
        <button onClick={logOutUser} type="button">Выход</button>
      </Header>
      {isError && 
        <Error errorMessage={errorMessage} isError={isError} />
      }
    </div>
  );
};

export default Home;
