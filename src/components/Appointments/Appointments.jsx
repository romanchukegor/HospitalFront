import Appointment from "src/components/Appointment/Appointment";
import "./style.scss";

const Appointments = ({ appointments }) => {
  return (
    <table className="table">
      <thead className="table-header">
        <tr className="table-header-appointments">
          <th className="table-header-appointments__column">Имя</th>
          <th className="table-header-appointments__column">Врач</th>
          <th className="table-header-appointments__column">Дата</th>
          <th className="table-header-appointments__column">Жалобы</th>
          <th className="table-header-appointments__empty"></th>
        </tr >
      </thead>
      {appointments.map((appointment) => {
        return <Appointment appointment={appointment} />;
      })}
    </table>
  );
};

export default Appointments;
