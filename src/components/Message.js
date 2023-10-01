import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Message.css";
import LinkParser from "react-link-parser";

const Message = forwardRef(({myName, username, message, sentOn }, ref) => {
  const isUser = myName === username;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Typography align={"left"} color={"primary"} display="block" >
        {!isUser && username}
      </Typography>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent className="message__content">
          <Typography color="initial" variant="subtitle2" className="message__body">
          <LinkParser >
              {message}
            </LinkParser>
            <span className="message__date" color="initial">
              {new Date(sentOn * 1000).toLocaleTimeString('en-US', {
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
