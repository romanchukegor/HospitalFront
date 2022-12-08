import { useState } from "react";
import Error from "src/components/Error/Error";
import { checkAllInputsByLength } from "src/helpers/validator";
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
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addNewAppointment = async () => {
    try {
      const { nameInput, complaintInput } = inputs;

      if (!checkAllInputsByLength(nameInput, selected, complaintInput)) {
        handleError("Все поля должны быть заполнены");
        return;
      }

      await createAppointment(nameInput, selected, date, complaintInput);
    } catch (error) {
      handleError("Ошибка добавления задачи");
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

  const handleError = (text) => {
    setIsError(true);
    setErrorMessage(text);
  };

  return (
    <div className="form">
      <input
        type="text"
        className={!isError ? "form__input" : "form__input_error"}
        name="nameInput"
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      />
      <select
        className={!isError ? "form__input" : "form__input_error"}
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
      >
        {doctors.map((doctor) => {
          return (
            <option
              key={doctor.value}
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
        className={!isError ? "form__input" : "form__input_error"}
        name="dateInput"
        onChange={handleChangeDate}
      />
      <input
        type="text"
        className={!isError ? "form__input" : "form__input_error"}
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
      {isError && <Error 
        errorMessage={errorMessage} isError={isError} />
      }
    </div>
  );
};

export default AppointmentForm;
