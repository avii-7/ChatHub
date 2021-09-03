import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Message.css";

const Message = forwardRef(({ username, data }, ref) => {
  // console.log("by", props.data);
  const isUser = username === data.username;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Typography align={"left"} color={"primary"} display="block" gutterBottom={true}>
        {!isUser && data.username}
      </Typography>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="initial" variant="subtitle1" component="h5">
            {data.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
