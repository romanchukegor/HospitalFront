import { useContext, useState } from "react";
import { Context } from "src";
import Error from "src/components/Error/Error";

const Home = () => {
  const store = useContext(Context);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userLogout = async () => {
    const error = await store.logout();

    if (error) {
      setIsError(true);
      setErrorMessage(error);
    }
  };

  return (
    <div>
      <button onClick={userLogout}>logout</button>
      {isError && (
        <Error errorMessage={errorMessage} isError={isError} />
      )}
    </div>
  );
};

export default Home;
