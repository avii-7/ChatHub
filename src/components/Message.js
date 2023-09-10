import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Message.css";
import LinkParser from "react-link-parser";

const Message = forwardRef(({ username, data }, ref) => {
  const isUser = username === data.username;
  const userPadding = {
    paddingLeft: "20px"
  };
  const guestPadding = {
    paddingLeft: "0px"
  }
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Typography align={"left"} color={"primary"} display="block" >
        {!isUser && data.username}
      </Typography>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent className="message__content">
          <Typography color="initial" variant="subtitle2" className="message__body">
          <LinkParser >
              {data.message}
            </LinkParser>
            <span className="message__date" color="initial">
              {data.timestamp !== null && new Date(data.timestamp.seconds * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit', hour12: true
              })}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
