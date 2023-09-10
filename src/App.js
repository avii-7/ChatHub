import "./App.css";
import db from "./Firebase/Firebase";
import FlipMove from "react-flip-move";
import Message from "./components/Message";
import SendIcon from "@material-ui/icons/Send";
import { IconButton, TextareaAutosize, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { FormControl } from "@material-ui/core";
import { collection, addDoc, query, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";
import { groupBy } from "core-js/actual/array/group-by";

function App() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("Unknown");
  const [messages, setMessages] = useState([]);
  const LocalName = "MyName";

  const EmptyCheck = (e) => {
    switch (e) {
      case "":
      case 0:
      case "0":
      case null:
      case false:
      case undefined:
        return true;
      default:
        return false;
    }
  }
  useEffect(() => {
    const q = query(collection(db, "conversation"), orderBy("timestamp"));
    onSnapshot(q, (collection) => {
      const data = collection.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      const groupedData = data.groupBy(message => { return new Date(message.data.timestamp.seconds * 1000).toLocaleDateString('hi-IN', { year:'2-digit', month: "2-digit", day:"2-digit", timeZone: "Asia/Kolkata"})});
      setMessages(groupedData);
      
      //{Object.keys(groupedData).map((key) => {console.log(key);})}
      window.scrollBy(0, document.body.scrollHeight);
    });

    var MyName = localStorage.getItem(LocalName) ?? prompt("Enter Your Name");
    if(EmptyCheck(MyName))
    {
      MyName = "Unknown";
    }
    localStorage.setItem(LocalName, MyName);

    setUsername(MyName.charAt(0).toUpperCase() + MyName.slice(1).toLowerCase());
    // eslint-disable-next-line
  }, []);

  const sendMessages = async (e) => {
    setInput("");
    e?.preventDefault();
    try {
      await addDoc(collection(db, "conversation"), {
        username: username,
        message: input,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log("Error Adding Data.");
    }
  };

const ShouldSendMessage = async (e) => { 
  if(e.keyCode === 13 && !e.ctrlKey)
  {
    e.preventDefault(); 
    await sendMessages(null); 
  }
  else if (e.keyCode === 13 && e.ctrlKey)
  {
    document.getElementById('MyTextArea').value += "\r\n";
  }
};

  return (
    <div className="App">
      <div className="app__header">
        <h1 className="app__h1">ChatHub</h1>
        <h4 className="app__h4">Welcome - {username}</h4>
      </div>
      <div className="app__msgContainer">
        <FlipMove>
          {Object.keys(messages).map((messageKey) => (
            <div>
              <Typography className="app__date" align={"center"} variant="h6" color={"black"}>
              {messageKey}
              </Typography>
              {messages[messageKey].map(({ id, data }) => (
                <Message key={id} username={username} data={data} />
              ))}
            </div>
          ))}
        </FlipMove>
      </div>
      <form className="app__form">
        <FormControl className="app__formControl">
          <TextareaAutosize className="app__input" id="MyTextArea" placeholder="Enter a message..." value={input} onChange={(e) => setInput(e.target.value)} minRows="4" autoFocus="true" onKeyDown={ShouldSendMessage}/>
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessages}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
