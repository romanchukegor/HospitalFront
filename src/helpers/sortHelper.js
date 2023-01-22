export const sortHelper = (
  sortedAppointments,
  appointments,
  setAppointments
) => {
  if (sortedAppointments) {

    if (sortedAppointments.sortBy) {
      const copyDate = [...appointments].sort((a, b) => {

        if (sortedAppointments.direction === "byDescending") {
          return a[sortedAppointments.sortBy] < b[sortedAppointments.sortBy]
            ? 1
            : -1;
        } else {
          return a[sortedAppointments.sortBy] > b[sortedAppointments.sortBy]
            ? 1
            : -1;
        }
      });

      setAppointments(copyDate);
    }
  }
};
