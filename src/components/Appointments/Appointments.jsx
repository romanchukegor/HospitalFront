import Appointment from "src/components/Appointment/Appointment";
import { list } from "src/constants";
import "./style.scss";

const Appointments = ({ appointments }) => {
  return (
    <table className="table">
      <thead className="table-header">
        <tr className="table-header-appointments">
          {list.map((element) => (
            <th key={element.id} className="table-header-appointments__column">
              {element}
            </th>
          ))}
          <th className="table-header-appointments__empty"></th>
        </tr>
      </thead>
      {appointments.map((appointment) => (
        <Appointment key={appointment.id} appointment={appointment} />
      ))}
    </table>
  );
};

export default Appointments;
