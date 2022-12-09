import { useState, useContext, useEffect } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import AppointmentForm from "src/components/AppointmentForm/AppointmentForm";
import Table from "src/components/Table/Table";
import { checkInputByEmptiness } from "src/helpers/validator";
import "./style.scss";

const Home = () => {
  const store = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllAppointments();
  }, []);

  const logOutUser = async () => {
    const error = await store.logout();

    if (error) {
      setIsError(true);
      setErrorMessage(error);
      return;
    }
  };

  const createAppointment = async (form) => {
    const { name, complaint, date, doctor } = form;

    if (!checkInputByEmptiness(name)) {
      handleError("Имя должно быть заполнено");
      return;
    }

    if (!checkInputByEmptiness(doctor)) {
      handleError("Имя врача должно быть заполнено");
      return;
    }

    if (!checkInputByEmptiness(date)) {
      handleError("Дата приема должна быть заполнена");
      return;
    }

    if (!checkInputByEmptiness(complaint)) {
      handleError("Поле жалоб должно быть заполнены");
      return;
    }

    const result = await store.addAppointment(form);

    if (!result) {
      handleError("Ошибка добавления приема");
      return;
    }

    setAppointments([...appointments, result.data]);

    return result.data;
  };

  const getAllAppointments = async () => {
    const result = await store.getAllAppointments();
    if (!result) {
      handleError("Ошибка получения приемов");
      return;
    }

    setAppointments(result.data);
  };

  const handleError = (text) => {
    setIsError(true);
    setErrorMessage(text);
  };

  return (
    <div className="home">
      <Header title="Приемы">
        <button onClick={logOutUser} type="button" className="home__button">
          Выход
        </button>
      </Header>
      <AppointmentForm
        createAppointment={createAppointment}
        isError={isError}
      />
      <Table appointments={appointments} />
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

export default Home;
