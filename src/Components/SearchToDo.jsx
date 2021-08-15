import "../App.css";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import backgroundImage from "../../src/Images/bg-desktop-dark.jpg";

const useStyles = makeStyles({
  root: {
    color: "black",
  },
});

const SearchToDo = () => {
  const [text, setText] = useState("");
  const [todos, setToDos] = useState([]);
  const classes = useStyles();

  const hangleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToDos([
      ...todos,
      {
        text: text,
        id: Math.random() * 100,
      },
    ]);
  };
  console.log(todos);
  return (
    <div>
      <img src={backgroundImage} alt="pic" />
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
              onChange={hangleChange}
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
        <h1 style={{ color: "black" }}> length : {todos.length}</h1>
      </div>
      {/* render the todos list */}
      {todos.map((todo, idx) => {
        return (
          <div key={idx}>
            <h2 style={{ color: "black" }}>{todo.text}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default SearchToDo;
