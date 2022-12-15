import { useState, useContext, useEffect } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import AppointmentForm from "src/components/AppointmentForm/AppointmentForm";
import AppointmentTable from "src/components/AppointmentTable/AppointmentTable";
import DeleteModal from "src/components/DeleteModal/DeleteModal";
import EditModal from "src/components/EditModal/EditModal";
import { checkInputByEmptiness } from "src/helpers/validator";
import "./style.scss";

const Home = () => {
  const store = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActiveDeleteModal, setIsActiveDeleteModal] = useState(false);
  const [isActiveEditModal, setIsActiveEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  useEffect(() => {
    getAllAppointments();
  }, []);

  const logOutUser = async () => {
    const result = await store.logOutUser();

    if (!result.data) {
      handleError("Ошибка выхода");
      return;
    }
  };

  const createAppointment = async (appointmentForm) => {
    const { name, complaint, date, doctor } = appointmentForm;

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

    const result = await store.addAppointment(appointmentForm);

    if (!result.data) {
      handleError("Ошибка добавления приема");
      return;
    }

    setAppointments([...appointments, result.data]);

    return result.data;
  };

  const getAllAppointments = async () => {
    const result = await store.getAllAppointments();

    if (!result.data) {
      handleError("Ошибка получения приемов");
      return;
    }

    setAppointments(result.data);
  };

  const deleteAppointment = async (_id) => {
    const result = await store.deleteAppointment(_id);

    if (!result.data) {
      handleError("Ошибка получения приемов");
      return;
    }

    setAppointments([...appointments.filter((elem) => elem._id !== _id)]);
    setIsActiveDeleteModal(false);
  };

  const editAppointment = async (_id, editForm) => {
    const result = await store.editAppointment(_id, editForm);

    if (!result.data) {
      handleError("Ошибка обновления приема");
      return;
    }

    const updatedAppointments = [...appointments].map((appointment) => {
      if (appointment._id === result.data._id) {
        appointment.name = result.data.name;
        appointment.doctor = result.data.doctor;
        appointment.date = result.data.date;
        appointment.complaint = result.data.complaint;
      }

      setIsActiveEditModal(false);

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
      <AppointmentTable
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
