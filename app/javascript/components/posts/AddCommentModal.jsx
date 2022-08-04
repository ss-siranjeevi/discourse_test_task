import React, { useState } from "react";
import axios from "axios-on-rails";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextareaAutosize,
  TextField,
} from "@mui/material";

import SnackBar from "../snackbar";
import { ADD_COMMENT_APT, POSTS_API } from "../../constants/Apis";

function AddCommentModal({
  setAddCommentModal,
  setCreatePost,
  createPost,
  refetch,
  id,
}) {
  const [textFieldData, setTextFieldData] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleOnClose = () => {
    if (createPost) {
      setCreatePost(false);
    } else {
      setAddCommentModal(false);
    }
  };

  const handleTextFieldChange = (e) => {
    setTextFieldData(e.target.value);
  };

  const handleonPostSave = () => {
    const token = localStorage.getItem("login");

    if (createPost) {
      if (textFieldData.length < 10) {
        setErrMsg("Need atleast 10 characters to create a post");
      } else {
        setCreatePost(false);
        setErrMsg("");

        axios
          .post(
            POSTS_API,
            { title: textFieldData },
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            console.log(response);
            refetch();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (textFieldData.length === 0) {
        setErrMsg("Please Enter a comment!");
      } else {
        setErrMsg("");
        setAddCommentModal(false);
        console.log("textFieldData", textFieldData);

        axios
          .post(
            ADD_COMMENT_APT,
            { post_id: id, title: textFieldData },
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            console.log(response);
            refetch();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <>
      <Dialog open={true} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {createPost ? "Create Post." : "Add comment."}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            {createPost ? (
              <Box display="flex" flexDirection="column">
                <p>Post Description</p>
                <TextareaAutosize
                  name="title"
                  placeholder="Enter Post Description"
                  style={{ width: "500px", height: "100px" }}
                  onChange={(e) => {
                    handleTextFieldChange(e);
                  }}
                />
              </Box>
            ) : (
              <Box display="flex" flexDirection="column">
                <TextareaAutosize
                  name="commentu"
                  placeholder="Enter Comment"
                  style={{ width: "500px", height: "100px" }}
                  onChange={(e) => {
                    handleTextFieldChange(e);
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={() => handleOnClose()}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="success"
            autoFocus
            onClick={() => handleonPostSave()}
          >
            {createPost ? "Save Post" : "Save Comment"}
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

export default AddCommentModal;
