import "./App.css";
import db from "./Firebase/Firebase";
import FlipMove from "react-flip-move";
import Message from "./components/Message";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { FormControl, Input } from "@material-ui/core";
import { collection, addDoc, query, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";

function App() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("Unknown");
  const [messages, setMessages] = useState([]);

  // const getName = () => {
  //   let uname = prompt("Enter your name ...");
  //   return uname === "" || uname === null ? "Unknown" : uname.charAt(0).toUpperCase() + uname.toLowerCase().slice(1);
  // };

  useEffect(() => {
    const q = query(collection(db, "conversation"), orderBy("timestamp"));
    onSnapshot(q, (collection) => {
      const x = collection.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      setMessages(x);
      window.scrollBy(0, document.body.scrollHeight);

      // setUsername();
    });
    let name = prompt("Enter your name....");
    setUsername(name === null || name === undefined ? "Unknown" : name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
    // eslint-disable-next-line
  }, []);

  const sendMessages = async (e) => {
    setInput("");
    e.preventDefault();
    try {
      await addDoc(collection(db, "conversation"), {
        username: username,
        message: input,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log("Error Adding Data");
    }
  };

  return (
    <div className="App">
      <h1 className="app__h1">ChatHub</h1>
      <h3 className="app__h3">Welcome - {username}</h3>
      <div className="app__msgContainer">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} username={username} data={data} />
          ))}
        </FlipMove>
      </div>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessages}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
