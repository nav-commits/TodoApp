import "../App.css";
import {
  Grid,
  TextField,
  Button,
  Card,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  root: {
    color: "black",
  },
  Card: {
    width: "100%",
  },
  lineAcross: {
    textDecoration: "line-through",
  },
});

const SearchToDo = () => {
  const [text, setText] = useState("");
  const [todos, setToDos] = useState([]);
  const [status, SetStatus] = useState("All");
  const [filtered, setFiltered] = useState([]);
  const classes = useStyles();

  // filter todos
  useEffect(() => {
    if (status === "All") {
      setFiltered(todos);
    } else if (status === "Completed") {
      setFiltered(todos.filter((todo) => todo.completed === true));
    } else if (status === "UnCompleted") {
      setFiltered(todos.filter((todo) => todo.completed === false));
    }
  }, [todos, status]);

  useEffect(() => {
    getToDos();
  }, []);

  useEffect(() => {
    saveToDos();
  }, [todos]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    let count = 1;
    const toDos = [...todos];
    const newToDos = [...toDos, { text: text, completed: false }];
    const newKey = newToDos.map((newtodo) => ({ ...newtodo, id: count++ }));
    setToDos(newKey);
    setText("");
  };

  const deleteHandler = (id) => {
    const allToDos = [...todos];
    const updatedList = allToDos.filter((alltodos) => alltodos.id !== id);
    setToDos(updatedList);
  };

  const completeHandler = (oldtodo) => {
    setToDos(
      todos.map((item) => {
        if (item.id === oldtodo) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  // save todos in localstorage
  const saveToDos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  // get todos from localstorage
  const getToDos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      const localStorageToDos = JSON.parse(localStorage.getItem("todos"));
      setToDos(localStorageToDos);
    }
  };
  console.log(todos);
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={10}>
          <form>
            <TextField
              style={{ width: "280px" }}
              label="Todos"
              value={text}
              onChange={handleChange}
            />
            <Button
              onClick={handleSubmit}
              style={{ marginTop: "20px", marginLeft: "20px" }}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <h1 style={{ color: "grey" }}> ToDos : {todos.length}</h1>
      </div>
      {/* render the todos list */}
      <Card className={classes.Card}>
        {filtered.map((todo) => {
          return (
            <div key={todo.id}>
              <h1
                className={todo.completed ? classes.lineAcross : null}
                style={{ color: "grey" }}
              >
                {todo.text}{" "}
                <CheckCircleIcon
                  color={todo.completed ? "secondary" : "primary"}
                  style={{ cursor: "pointer" }}
                  onClick={() => completeHandler(todo.id)}
                />
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteHandler(todo.id)}
                  color="primary"
                />
              </h1>
              <Divider orientation="horizontal" />
            </div>
          );
        })}
      </Card>
      <div style={{ marginTop: "50px" }}>
        <Button
          style={{
            backgroundColor: "blue",
            marginRight: "10px",
            color: "white",
          }}
          color="primary"
          onClick={() => SetStatus("All")}
        >
          All
        </Button>
        <Button
          onClick={() => SetStatus("Completed")}
          style={{
            backgroundColor: "blue",
            marginRight: "10px",
            color: "white",
          }}
          color="primary"
        >
          Completed
        </Button>
        <Button
          onClick={() => SetStatus("UnCompleted")}
          style={{ backgroundColor: "blue", color: "white" }}
          color="primary"
        >
          UnCompleted
        </Button>
      </div>
    </div>
  );
};

export default SearchToDo;
