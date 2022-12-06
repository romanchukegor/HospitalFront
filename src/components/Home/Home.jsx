import { useState, useContext, useEffect } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import {
  addAppointmentService,
  getAllAppointmentsService,
} from "src/appointmentService";
import "./style.scss";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import Appointment from "../Appointment/Appointment";

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

  const addAppointment = async (
    nameInput,
    selected,
    dateInput,
    complaintInput
  ) => {
    console.log(nameInput, selected, dateInput, complaintInput);
    try {
      const res = await addAppointmentService(
        nameInput,
        selected,
        dateInput,
        complaintInput
      );

      setAppointments([...appointments, res.data]);

      return res.data;
    } catch (err) {
      setIsError({
        error: true,
        errorText: "Не удалось добавить задачу",
      });
    }
  };

  const getAllAppointments = async () => {
    try {
      const res = await getAllAppointmentsService();
      console.log(res.data)
      setAppointments(res.data);
    } catch (err) {
      setIsError({
        error: true,
        errorText: "Не удалось получить задачи",
      });
    }
  };

  return (
    <div className="home">
      <Header title={"Приемы"}>
        <button onClick={logOutUser} type="button" className="home__button">
          Выход
        </button>
      </Header>
      <AppointmentForm addAppointment={addAppointment}/>
      {appointments.map((appointment) => {
        return (
          <Appointment
            appointment={appointment}
          />
        );
      })}
      {isError && <Error errorMessage={errorMessage} isError={isError} />}
    </div>
  );
};

export default Home;
