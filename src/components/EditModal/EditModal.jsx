import { useState } from "react";
import Modal from "src/components/Modal/Modal";
import Error from "src/components/Error/Error";
import { doctors } from "src/constants";
import { changeFormatDate, checkInputByEmptiness } from "src/helpers/validator";


const EditModal = ({
  editAppointment,
  titleForEditButtonChange,
  setIsActiveEditModal,
  currentAppointment,
  title,
}) => {
  const [editForm, setEditForm] = useState({
    name: currentAppointment.name,
    doctor: currentAppointment.doctor,
    date: changeFormatDate(currentAppointment.date, "YYYY-MM-DD"),
    complaint: currentAppointment.complaint,
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateAppointmet = async (_id, editForm) => {
    const { name, complaint, date, doctor } = editForm;

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

    await editAppointment(_id, editForm);
  };

  const handleError = (text) => {
    setIsError(true);
    setErrorMessage(text);
  };

  const handleChange = (name, value) => {
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal
        modifyAppointment={updateAppointmet}
        setIsActiveModal={setIsActiveEditModal}
        title={title}
        currentAppointment={currentAppointment}
        titleForButtonChange={titleForEditButtonChange}
        editForm={editForm}
      >
        <div className="edit-form-box">
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={editForm.name}
          name="name"
          className={
            !isError
              ? "modal-content-body__input"
              : "modal-content-body__input_error"
          }
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
        </div>
        <div className="edit-form-box">
        <label htmlFor="doctor">Врач:</label>
        <select
          className={
            !isError
              ? "modal-content-body__input"
              : "modal-content-body__input_error"
          }
          id="doctor"
          value={editForm.doctor}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
          name="doctor"
        >
          
          {doctors.map((doctor) => (
            <option
              key={doctor.name}
              onChange={(event) =>
                handleChange(event.target.name, event.target.value)
              }
            >
              {doctor.name}
            </option>
          ))}
          
        </select>
        </div>
        <div className="edit-form-box">
        <label htmlFor="date">Дата:</label>
        <input
          type="date"
          id="date"
          value={editForm.date}
          name="date"
          className={
            !isError
              ? "modal-content-body__input"
              : "modal-content-body__input_error"
          }
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
        </div>
        <div className="edit-form-box">
        <label htmlFor="compalint">Жалобы:</label>
        <input
          type="text"
          id="complaint"
          value={editForm.complaint}
          name="complaint"
          className={
            !isError
              ? "modal-content-body__input"
              : "modal-content-body__input_error"
          }
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
        </div>
      </Modal>
      {isError && (
        <Error
          isError={isError}
          errorMessage={errorMessage}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};

export default EditModal;
