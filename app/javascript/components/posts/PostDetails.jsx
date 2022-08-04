import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import AddCommentIcon from "@mui/icons-material/AddComment";

import EditComponent from "./EditComponent";
import AddCommentModal from "./AddCommentModal";
import user from "./user.jpg";

function PostDetails({
  setViewCommentModal,
  setCommentData,
  postData,
  refetch,
}) {
  const [editPost, setEditPost] = useState();
  const [addCommentModal, setAddCommentModal] = useState(false);
  const userId = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    refetch();
  }, []);

  const handleEdit = (ele) => {
    setEditPost(ele);
  };
  const handleViewComment = (ele) => {
    setCommentData(ele.comments);
    setViewCommentModal(true);
  };

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {postData?.map((data) => (
          <React.Fragment key={data.id}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={user} />
              </ListItemAvatar>
              <ListItemText primary={data.user.name} secondary={data.title} />
              <Box>
                <Tooltip title=" Add comment">
                  <IconButton onClick={() => setAddCommentModal(data.id)}>
                    <AddCommentIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    userId === data.user.id
                      ? "Edit Post"
                      : "User can only edit their own posts"
                  }
                >
                  <IconButton
                    onClick={
                      userId === data.user.id ? () => handleEdit(data) : null
                    }
                  >
                    <EditIcon
                      color={userId === data.user.id ? "primary" : "error"}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    data?.comments?.length === 0
                      ? "No comments"
                      : "View comments"
                  }
                >
                  <IconButton
                    onClick={() =>
                      data?.comments?.length === 0
                        ? null
                        : handleViewComment(data)
                    }
                  >
                    <CommentIcon
                      color={data?.comments?.length === 0 ? "error" : "primary"}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      {editPost && (
        <EditComponent
          setEditPost={setEditPost}
          editPost={editPost}
          refetch={refetch}
        />
      )}
      {addCommentModal && (
        <AddCommentModal
          id={addCommentModal}
          setAddCommentModal={setAddCommentModal}
          refetch={refetch}
        />
      )}
    </>
  );
}

export default PostDetails;
