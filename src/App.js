import React, { useEffect, useState } from "react";
import { Card, makeStyles, TextField } from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    if (input !== "") {
      db.collection("todos").add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInput("");
  };

  const useStyles = makeStyles(() => ({
    card: {
      backgroundColor: "rgb(250, 250, 246)",
    },
  }));

  const classes = useStyles();

  return (
    <Card className={`app max-width ${classes.card}`}>
      <div className="app__header">
        <div className="app__title">
          <p>T</p>
          <p>O</p>
          <p>D</p>
          <p>O</p>
        </div>
        <form onSubmit={addTodo}>
          <TextField
            className={classes.margin}
            id="outlined-secondary"
            label="Post Here"
            variant="outlined"
            value={input}
            fullWidth
            onChange={(event) => setInput(event.target.value)}
          />
        </form>
      </div>
      <div className="app__todos">
        {todos.map((todo) => (
          <Todo todo={todo} className="app__todo" />
        ))}
      </div>
    </Card>
  );
}

export default App;
