import { useState } from "react";
import { doctors } from "src/constants";
import "./style.scss";

const AppointmentForm = ({ createAppointment, isError }) => {
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    doctor: doctors[0].value,
    date: "",
    complaint: "",
  });

  const addNewAppointment = async () => {
    const appointment = await createAppointment(appointmentForm);

    if (appointment) {
      setAppointmentForm({
        ...appointmentForm,
        name: "",
        doctor: doctors[0].value,
        date: "",
        complaint: "",
      });
    }
  };

  const handleChange = (name, value) => {
    setAppointmentForm({
      ...appointmentForm,
      [name]: value,
    });
  };

  return (
    <div className="appointment-form">
      <div className="appointment-form-box">
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          className={!isError ? "appointment-form-box__input" : "appointment-form-box__input_error"}
          value={appointmentForm.name}
          name="name"
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </div>
      <div className="appointment-form-box">
        <label htmlFor="doctor">Врач:</label>
        <select
          className={!isError ? "appointment-form-box__input" : "appointment-form-box__input_error"}
          id="doctor"
          value={appointmentForm.doctor}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
          name="doctor"
        >
          {doctors.map((doctor, index) => (
            <option
              key={index}
              onChange={(event) =>
                handleChange(event.target.name, event.target.value)
              }
            >
              {doctor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="appointment-form-box">
        <label htmlFor="date">Дата:</label>
        <input
          type="date"
          id="date"
          value={appointmentForm.date}
          className={!isError ? "appointment-form-box__input" : "appointment-form-box__input_error"}
          name="date"
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </div>
      <div className="appointment-form-box">
        <label htmlFor="complaint">Жалобы:</label>
        <input
          type="text"
          id="complaint"
          className={!isError ? "appointment-form-box__input" : "appointment-form-box__input_error"}
          value={appointmentForm.complaint}
          name="complaint"
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </div>
      <button
        className="appointment-form__button"
        onClick={addNewAppointment}
        type="button"
      >
        Добавить
      </button>
    </div>
  );
};

export default AppointmentForm;
