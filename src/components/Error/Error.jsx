import React, { useState } from "react";
import { Snackbar } from "@mui/material";

const Error = ({ errorMessage, isError }) => {
  const [open] = useState(isError);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} message={errorMessage} />
    </div>
  );
};

export default Error;
