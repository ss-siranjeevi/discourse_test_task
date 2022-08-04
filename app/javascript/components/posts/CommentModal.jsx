import React from "react";
import axios from "axios-on-rails";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import DisplayComponents from "./DisplayComponents";
import { POSTS_API } from "../../constants/Apis";

export function CommentModal({
  setViewCommentModal,
  viewCommentModal,
  commentData,
}) {
  console.log("commentData", commentData);
  const refetch = () => {
    const token = localStorage.getItem("login");
    axios
      .get(POSTS_API, { headers: { token: token } })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        open={viewCommentModal}
        aria-labelledby="draggable-dialog-title"
        PaperProps={{
          sx: {
            width: "50%",
            minHeight: 200,
          },
        }}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Comments
        </DialogTitle>
        <DialogContent>
          <DisplayComponents
            setViewCommentModal={setViewCommentModal}
            viewCommentModal={viewCommentModal}
            commentData={commentData}
            refetch={refetch}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={() => setViewCommentModal(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
