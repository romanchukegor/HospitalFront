import { useState, useContext, useEffect } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Error from "src/components/Error/Error";
import AppointmentForm from "src/components/AppointmentForm/AppointmentForm";
import AppointmentTable from "src/components/AppointmentTable/AppointmentTable";
import SortForm from "../SortForm/SortForm";
import { checkInputByEmptiness, sortDirect } from "src/helpers/validator";
import { sortHelper } from "src/helpers/sortHelper";
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
  const [sortedAppointments, setSortedAppointments] = useState(null);

  useEffect(() => {
    getAllAppointments();
  }, []);

  useEffect(() => {
    if (sortedAppointments) {
      sortHelper(sortedAppointments, appointments, setAppointments);
    } else {
      getAllAppointments();
    }
  }, [sortedAppointments]);

  const logOutUser = async () => {
    const error = await store.userLogout();

    if (error) {
      setIsError(true);
      setErrorMessage(error);
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

  const editAppointment = async (_id, editForm) => {
    const result = await store.editAppointment(_id, editForm);

    if (!result) {
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

  const sortAppointmentsByName = (value) => {
    if (value === "") {
      setSortedAppointments(null);
    }

    if (!sortedAppointments) {
      setSortedAppointments({ sortBy: value, direction: "byAscending" });
    }
    
    if (sortedAppointments) {
      setSortedAppointments({ ...sortedAppointments, sortBy: value });
    }
  };

  const sortAppointmentsByDirection = (value) => {
    setSortedAppointments({ ...sortedAppointments, direction: value });
  };

  const handleError = (text) => {
    setIsError(true);
    setErrorMessage(text);
  };

  const selectDelete = (bool, appointment) => {
    setIsActiveDeleteModal(bool);
    setCurrentAppointment(appointment);
  };

  const selectEdit = (bool, appointment) => {
    setIsActiveEditModal(bool);
    setCurrentAppointment(appointment);
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
      <SortForm
        sortAppointmentsByName={sortAppointmentsByName}
        sortAppointmentsByDirection={sortAppointmentsByDirection}
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
