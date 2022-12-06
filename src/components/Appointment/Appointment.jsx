import React from "react";
import "./style.scss"

const Appointment = ({appointment}) => {
  return (
    <div>
      <table className="table">
        <tbody>
          <tr className="table-header">
            <td>Имя</td>
            <td>Врач</td>
            <td>Дата</td>
            <td>Жалобы</td>
            <td></td>
          </tr>
          <tr className="table-appointments">
            <td>{appointment.name}</td>
            <td>{appointment.doctor}</td>
            <td>{appointment.date}</td>
            <td>{appointment.complaint}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Appointment;
