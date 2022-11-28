import React, { useContext } from "react";
import { useState } from "react";
import { Context } from "../..";
import Error from "components/Error/Error";

const Home = () => {
  const { store } = useContext(Context);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userLogout = async () => {
    const response = await store.logout();

    if (!response.data) {
      setIsError(true);
      setErrorMessage("Ошибка выхода");
    }
  };

  return (
    <div>
      <button onClick={userLogout}>logout</button>
      {isError && <Error errorMessage={errorMessage} isError={isError} />}
    </div>
  );
};

export default Home;
