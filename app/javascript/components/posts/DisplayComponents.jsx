import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import user from "./user.jpg";

function DisplayComponents({ commentData }) {
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {commentData?.map((data) => (
          <React.Fragment key={data.id}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={user} />
              </ListItemAvatar>
              <ListItemText primary={data.user.name} secondary={data.title} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </>
  );
}

export default DisplayComponents;
