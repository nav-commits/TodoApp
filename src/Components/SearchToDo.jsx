import "../App.css";
import { Grid, TextField, Button, Card, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    color: "black",
  },
  Card: {
    width: "300px",
  },
});

const SearchToDo = () => {
  const [text, setText] = useState("");
  const [todos, setToDos] = useState([]);
  const classes = useStyles();
  
  useEffect(
    () => {
      getToDos()
    },[]
  )

  useEffect(
    () => {
      saveToDos();
    },
    [todos]
  );

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

  const saveToDos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getToDos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      const localStorageToDos = localStorage.setItem("todos", JSON.stringify(todos));
      setToDos(localStorageToDos)
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
        <h1 style={{ color: "grey" }}> length : {todos.length}</h1>
      </div>
      {/* render the todos list */}
      <Card className={classes.Card}>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <h2 style={{ color: "grey" }}>
                {todo.text}{" "}
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteHandler(todo.id)}
                  color="primary"
                />
              </h2>
              <Divider orientation="horizontal" />
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default SearchToDo;
