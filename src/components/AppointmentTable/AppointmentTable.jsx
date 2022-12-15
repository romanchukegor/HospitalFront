import { tableHeadlines } from "src/constants";
import { changeFormatDate } from "src/helpers/validator";
import deleteButton from "src/images/delete.svg";
import editButton from "src/images/edit.svg";
import "./style.scss";

const AppointmentTable = ({ appointments, selectDelete, selectEdit }) => {
  return (
    <table className="table">
      <thead className="table-header">
        <tr className="table-header-appointments">
          {tableHeadlines.map((headline, index) => (
            <th key={index} className="table-header-appointments__column">
              {headline}
            </th>
          ))}
          <th className="table-header-appointments__empty"></th>
        </tr>
      </thead>
      {appointments.map((appointment) => (
        <tbody className="table-body" key={appointment._id}>
          <tr className="table-body-appointments">
            <td className="table-body-appointments__column">
              {appointment.name}
            </td>
            <td className="table-body-appointments__column">
              {appointment.doctor}
            </td>
            <td className="table-body-appointments__column">
              {changeFormatDate(appointment.date, "DD/MM/YYYY")}
            </td>
            <td className="table-body-appointments__column">
              {appointment.complaint}
            </td>
            <td className="table-body-appointments-buttons">
              <button
                className="table-body-appointments-buttons__button"
                type="button"
                onClick={() => {
                  selectDelete(true, appointment);
                }}
              >
                <img src={deleteButton} alt="" />
              </button>
              <button
                className="table-body-appointments-buttons__button"
                type="button"
                onClick={() => {
                  selectEdit(true, appointment);
                }}
              >
                <img src={editButton} alt="" />
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default AppointmentTable;
