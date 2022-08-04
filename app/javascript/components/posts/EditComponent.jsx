import React, { useState } from "react";
import axios from "axios-on-rails";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
} from "@mui/material";

import SnackBar from "../snackbar";
import { POSTS_API } from "../../constants/Apis";

function EditComponent({ setEditPost, editPost, refetch }) {
  const [title, setTitle] = useState(editPost?.title);

  const [errMsg, setErrMsg] = useState("");

  const handleOnSaveClick = () => {
    if (title === editPost.title) {
      setErrMsg("No changes has been Made!");
    } else if (title.length < 10) {
      setErrMsg("You have to enter atleast 10 characters");
    } else {
      setErrMsg("");
      setEditPost("");

      const editedData = { title: title };
      const token = localStorage.getItem("login");
      axios
        .put(POSTS_API + "/" + editPost?.id, editedData, {
          headers: { token: token },
        })
        .then((response) => {
          console.log(response);
          refetch();
          setEditPost("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Dialog open={true} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Edit Post.
        </DialogTitle>
        <DialogContent>
          <Box>
            <TextareaAutosize
              value={title}
              style={{ width: "500px", height: "100px" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={() => setEditPost("")}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="success"
            autoFocus
            onClick={handleOnSaveClick}
          >
            Save
          </Button>
        </DialogActions>
        <SnackBar
          open={errMsg ? true : false}
          message={errMsg}
          onClose={() => setErrMsg("")}
        />
      </Dialog>
    </>
  );
}

export default EditComponent;
