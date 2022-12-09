import { useState } from "react";
import { doctors } from "src/constants";
import "./style.scss";

const AppointmentForm = ({ createAppointment, isError }) => {
  const [form, setForm] = useState({
    name: "",
    doctor: doctors[0].value,
    date: "",
    complaint: "",
  });

  const addNewAppointment = async () => {
    const response = await createAppointment(form);
    if (response) {
      setForm({
        ...form,
        name: "",
        doctor: "",
        date: "",
        complaint: "",
      });
    }
  };

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="form">
      <div className="form-box">
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          className={!isError ? "form-box__input" : "form-box__input_error"}
          value={form.name}
          name="name"
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </div>
      <div className="form-box">
        <label htmlFor="doctor">Врач:</label>
        <select
          className={!isError ? "form-box__input" : "form-box__input_error"}
          id="doctor"
          value={form.doctor}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
          name="doctor"
          placeholder="выбери"
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
      <div className="form-box">
        <label htmlFor="date">Дата:</label>
        <input
          type="date"
          id="date"
          value={form.date}
          className={!isError ? "form-box__input" : "form-box__input_error"}
          name="date"
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </div>
      <div className="form-box">
        <label htmlFor="complaint">Жалобы:</label>
        <input
          type="text"
          id="complaint"
          className={!isError ? "form-box__input" : "form-box__input_error"}
          value={form.complaint}
          name="complaint"
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />
      </div>
      <button
        className="form__button"
        onClick={addNewAppointment}
        type="button"
      >
        Добавить
      </button>
    </div>
  );
};

export default AppointmentForm;
