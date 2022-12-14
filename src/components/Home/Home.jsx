import { useState, useContext, useEffect } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import AppointmentForm from "src/components/AppointmentForm/AppointmentForm";
import Table from "src/components/Table/Table";
import { checkInputByEmptiness } from "src/helpers/validator";
import "./style.scss";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";

const Home = () => {
  const store = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActiveDeleteModal, setIsActiveDeleteModal] = useState(false);
  const [isActiveEditModal, setIsActiveEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  console.log(currentAppointment);

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

  const deleteAppointment = async (_id) => {
    const result = await store.deleteAppointment(_id);

    if (!result) {
      handleError("Ошибка получения приемов");
      return;
    }

    setAppointments([...appointments.filter((elem) => elem._id !== _id)]);
    setIsActiveDeleteModal(false);
  };

  const editAppointment = async (_id, form) => {
    const result = await store.editAppointment(_id, form);

    if (!result) {
      handleError("Ошибка получения приемов");
      return;
    }

    const updatedAppointments = [...appointments].map((appointment) => {
      if (appointment._id === result.data._id) {
        appointment.name = result.data.name;
        appointment.doctor = result.data.doctor;
        appointment.date = result.data.date;
        appointment.complaint = result.data.complaint;
      }

      return appointment;
    });
    setAppointments(updatedAppointments);
  };

  const handleError = (text) => {
    setIsError(true);
    setErrorMessage(text);
  };

  const selectDelete = (bool, apppintment) => {
    setIsActiveDeleteModal(bool);
    setCurrentAppointment(apppintment);
  };

  const selectEdit = (bool, apppintment) => {
    setIsActiveEditModal(bool);
    setCurrentAppointment(apppintment);
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
      <Table
        appointments={appointments}
        selectDelete={selectDelete}
        selectEdit={selectEdit}
      />
      {isActiveDeleteModal && (
        <DeleteModal
          deleteAppointment={deleteAppointment}
          setIsActiveDeleteModal={setIsActiveDeleteModal}
          title="Удалить прием"
          titleForDeleteButtonChange="Удалить"
          currentAppointment={currentAppointment}
        />
      )}
      {isActiveEditModal && (
        <EditModal
          editAppointment={editAppointment}
          title="Редактировать прием"
          titleForEditButtonChange="Сохранить"
          currentAppointment={currentAppointment}
          setIsActiveEditModal={setIsActiveEditModal}
        />
      )}
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
