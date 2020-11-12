import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  makeStyles,
  Modal,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Todo.css";

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
      transform: "translateZ(0)",
      "@media all and (-ms-high-contrast: none)": {
        display: "none",
      },
    },
    card: {
      backgroundColor: "white",
      margin: "20px 10px",
    },
    icon1: {
      cursor: "pointer",
      // padding: "9px",
      width: 30,
      height: 30,
      "& :hover": {
        color: "rgb(0, 25, 248)",
      },
    },
    icon2: {
      cursor: "pointer",
      // padding: "9px",
      width: 30,
      height: 30,
      "& :hover": {
        color: "rgb(248, 0, 0)",
      },
    },
    modal: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      padding: theme.spacing(1),
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  return (
    <div className="todo">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        disablePortal
        disableEnforceFocus
        className={classes.modal}
        disableAutoFocus
      >
        <div className={classes.paper}>
          <h1 className="todo__edit">Edit Todo</h1>
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <Card className={`todo__content ${classes.card}`}>
        <div className="todo__text">
          <CardContent>
            <div className="todo__wrap">{props.todo.todo}</div>
          </CardContent>
        </div>
        <div className="todo__icons">
          <CardActions>
            <EditIcon
              className={classes.icon1}
              onClick={(e) => setOpen(true)}
            />
            <DeleteForeverIcon
              className={classes.icon2}
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
            />
          </CardActions>
        </div>
      </Card>
    </div>
  );
}

export default Todo;
