import { useState, useContext, useEffect } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import AppointmentForm from "src/components/AppointmentForm/AppointmentForm";
import Appointments from "src/components/Appointments/Appointments";
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
    }
  };

  const createAppointment = async (
    nameInput,
    selected,
    dateInput,
    complaintInput
  ) => {
    try {
      const result = await store.addAppointment(
        nameInput,
        selected,
        dateInput,
        complaintInput
      );
      setAppointments([...appointments, result.data]);

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAppointments = async () => {
    try {
      const result = await store.getAllAppointments();
      setAppointments(result.data);
    } catch (err) {
      console.log(err);
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
      <AppointmentForm createAppointment={createAppointment} />
      <Appointments appointments={appointments} />
      {isError && <Error errorMessage={errorMessage} isError={isError} />}
    </div>
  );
};

export default Home;
