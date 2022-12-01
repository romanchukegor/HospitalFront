import { Snackbar } from "@mui/material";

const Error = ({ errorMessage, isError }) => {
  return (
    <Snackbar 
      open={isError} 
      autoHideDuration={3000} 
      message={errorMessage} />
  );
};

export default Error;
