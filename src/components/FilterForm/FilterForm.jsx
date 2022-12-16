import React from "react";
import { useState } from "react";

import deleteImage from "src/images/delete.svg";
import "./style.scss";

const FilterForm = ({ filterByDate, getAllAppointments }) => {
  const [rangeDate, setRangeDate] = useState({
    start: "",
    end: ""
  })

  return (
    <div className="filter-form">
      <label htmlFor="date">С:</label>
      <input
        type="date"
        id="date"
        className="filter-form__input"
        onChange={(event) => setRangeDate({start: event.target.value})}
      />
      <label htmlFor="date">По:</label>
      <input
        type="date"
        id="date"
        className="filter-form__input"
        onChange={(event) => setRangeDate({end: event.target.value})}
      />
      <button className="filter-form__button" onClick={() => filterByDate(rangeDate)}>Фильтровать</button>
      <button className="filter-form__delete-button" onClick={getAllAppointments}>
        <img src={deleteImage} alt="" className="filter-form__image" />
      </button>
    </div>
  );
};

export default FilterForm;
