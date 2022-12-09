import { Snackbar } from "@mui/material";

const Error = ({ errorMessage, isError, setIsError }) => {
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsError(false);
  };
  return (
    <Snackbar
      open={isError}
      autoHideDuration={6000}
      onClose={handleClose}
      message={errorMessage}
    />
  );
};

export default Error;
