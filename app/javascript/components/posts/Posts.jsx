import React, { useState } from "react";
import axios from "axios-on-rails";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import { CommentModal } from "./CommentModal";
import AddCommentModal from "./AddCommentModal";
import PostDetails from "./PostDetails";
import { POSTS_API } from "../../constants/Apis";
import "./Post.css";

export default function Posts() {
  const [viewCommentModal, setViewCommentModal] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [commentData, setCommentData] = useState();
  const [postData, setPostData] = useState([]);

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("name");
    localStorage.removeItem("id");

    navigate("/");
  };

  const refetch = () => {
    const token = localStorage.getItem("login");
    axios
      .get(POSTS_API, { headers: { token: token } })
      .then((response) => {
        setPostData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const username = localStorage.getItem("name");

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary">
        <Toolbar variant="dense" className="post_header">
          <Typography>UserName : {username ? username : ""}</Typography>
          <Typography variant="h6" color="inherit">
            Posts
          </Typography>
          <Button onClick={handleSignOutClick} style={{ color: "white" }}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Paper
        style={{ maxHeight: 600, overflow: "auto" }}
        className="posts_component"
      >
        <PostDetails
          setViewCommentModal={setViewCommentModal}
          setCommentData={setCommentData}
          postData={postData}
          refetch={refetch}
        />
      </Paper>
      <Box className="Create-post-button">
        <Button variant="contained" onClick={() => setCreatePost(true)}>
          Create Post
          <AddIcon color="white" fontSize="small" />
        </Button>
      </Box>
      {viewCommentModal && (
        <CommentModal
          setViewCommentModal={setViewCommentModal}
          viewCommentModal={viewCommentModal}
          commentData={commentData}
        />
      )}

      {createPost && (
        <AddCommentModal
          setCreatePost={setCreatePost}
          createPost={createPost}
          refetch={refetch}
        />
      )}
    </React.Fragment>
  );
}
