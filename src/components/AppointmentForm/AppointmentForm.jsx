import { useState } from "react";
import "./style.scss";

const AppointmentForm = ({ createAppointment }) => {
  const doctors = [
    { value: "", name: "--Выберите доктора--" },
    { value: "Komarov", name: "А.Е Комаров" },
    { value: "Aibolit", name: "И.С Айболит" },
    { value: "Ivanov", name: "С.Ю Иванов" },
    { value: "Petrov", name: "И.И Петров" },
  ];

  const [inputs, setInputs] = useState({
    nameInput: "",
    complaintInput: "",
  });
  const [selected, setSelected] = useState(doctors[0].value);
  const [date, setDate] = useState(new Date());

  const addNewAppointment = async () => {
    try {
      const { nameInput, complaintInput } = inputs;
      await createAppointment(nameInput, selected, date, complaintInput);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleChangeDate = (e) => {
     setDate(e.target.value);
  };

  return (
    <div className="form">
      <input
        type="text"
        className="form__input"
        name="nameInput"
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <select
        className="form__input"
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
      >
        {doctors.map((doctor) => {
          return (
            <option
              onChange={(event) =>
                handleChange(event.target.name, event.target.value)
              }
            >
              {doctor.name}
            </option>
          );
        })}
      </select>
      <input
        type="date"
        className="form__input"
        name="dateInput"
        onChange={handleChangeDate}
      />
      <input
        type="text"
        className="form__input"
        name="complaintInput"
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
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
