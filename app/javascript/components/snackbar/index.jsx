import React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ open, message, onClose, severity }) => {
  if (message && open) {
    return (
      <Snackbar
        style={{ width: "40%" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => onClose()}
      >
        <Alert
          onClose={() => onClose()}
          severity={severity ? severity : "error"}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return null;
};

export default SnackBar;
