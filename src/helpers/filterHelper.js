import moment from "moment";

export const filterHelper = (arr, start, end, setAppointments) => {
  if (!start && end) {
    const result = [...arr].filter((element) =>
      moment(element.date).isSameOrBefore(end)
    );
    setAppointments(result);
  }
  if (start && !end) {
    const result = [...arr].filter((element) =>
      moment(element.date).isSameOrAfter(start)
    );
    setAppointments(result);
  }
  if (start && end) {
    const result = [...arr].filter((element) =>
      moment(element.date).isBetween()
    );
    setAppointments(result);
  }
};
