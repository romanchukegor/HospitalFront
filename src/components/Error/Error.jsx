import { Snackbar } from "@mui/material";

const Error = ({ errorMessage, isError }) => {
  return (
    <div>
      <Snackbar 
      open={isError} 
      autoHideDuration={3000} 
      message={errorMessage} />
    </div>
  );
};

export default Error;
