import moment from "moment";
import deleteButton from "src/images/delete.svg";
import editButton from "src/images/edit.svg";
import "./style.scss";

const Appointment = ({ appointment }) => {
  return (
    <tbody className="table-body">
      <tr className="table-body-appointments">
        <td className="table-body-appointments__column">{appointment.name}</td>
        <td className="table-body-appointments__column">
          {appointment.doctor}
        </td>
        <td className="table-body-appointments__column">
          {moment(appointment.date).format("DD.MM.YYYY")}
        </td>
        <td className="table-body-appointments__column">
          {appointment.complaint}
        </td>
        <td className="table-body-appointments-buttons">
          <img
            src={deleteButton}
            alt=""
            className="table-body-appointments-buttons__img"
          />
          <img
            src={editButton}
            alt=""
            className="table-body-appointments-buttons__img"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default Appointment;
