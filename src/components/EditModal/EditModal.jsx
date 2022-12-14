import { useState } from "react";
import { doctors } from "src/constants";
import { getData } from "src/helpers/validator";
import Modal from "../Modal/Modal";

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
    date: getData(currentAppointment.date, "YYYY-MM-DD"),
    complaint: currentAppointment.complaint,
  });

  const handleChange = (name, value) => {
    console.log(name, value);
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  return (
    <Modal
      modifyAppointment={editAppointment}
      setIsActiveModal={setIsActiveEditModal}
      title={title}
      currentAppointment={currentAppointment}
      titleForButtonChange={titleForEditButtonChange}
      editForm={editForm}
    >
      <input
        type="text"
        value={editForm.name}
        name="name"
        className="modal-content-body__input"
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <select
        className="modal-content-body__input"
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
      <input
        type="date"
        value={editForm.date}
        name="date"
        className="modal-content-body__input"
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <input
        type="text"
        value={editForm.complaint}
        name="complaint"
        className="modal-content-body__textarea"
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
    </Modal>
  );
};

export default EditModal;
