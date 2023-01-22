import { useState } from "react";
import { sortSelectValues, sortDirectionValues } from "src/constants";
import addFilterForm from "src/images/addFilterForm.svg";
import "./style.scss";

const SortForm = ({
  sortAppointmentsByName,
  sortAppointmentsByDirection,
  setIsActiveFilterForm,
}) => {
  const [openDirectionFireld, setOpenDirectionField] = useState(false);
  const [closeFilterButton, setCloseFilterButton] = useState(false);

  const openFilterForm = () => {
    setIsActiveFilterForm(true);
    setCloseFilterButton(true);
  };
  return (
    <div className="sort-field">
      <label htmlFor="sortValue" className="sort-field__label">
        Сортировать по:
      </label>
      <select
        name="sortValue"
        id="sortValue"
        className="sort-field__select"
        onChange={(event) => {
          if (event.target.value !== "") {
            setOpenDirectionField(true);
          } else {
            setOpenDirectionField(false);
          }

          sortAppointmentsByName(event.target.value);
        }}
      >
        {sortSelectValues.map((element, index) => {
          return (
            <option key={index} value={element.value}>
              {element.name}
            </option>
          );
        })}
      </select>
      {openDirectionFireld && (
        <label htmlFor="sortDirection" className="sort-field__label">
          Направление:
        </label>
      )}
      {openDirectionFireld && (
        <select
          name="sortDirection"
          id="sortDirection"
          className="sort-field__select"
          onChange={(event) => sortAppointmentsByDirection(event.target.value)}
        >
          {sortDirectionValues.map((element, index) => {
            return (
              <option key={index} value={element.value}>
                {element.name}
              </option>
            );
          })}
        </select>
      )}
      {!closeFilterButton && (
        <div className="filter-box">
          <label htmlFor="img" className="filter-box__label">
            Добавить фильтр по дате:
          </label>
          <button className="filter-box-button" onClick={openFilterForm}>
            <img
              src={addFilterForm}
              alt=""
              id="img"
              className="filter-box-button__img"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default SortForm;
