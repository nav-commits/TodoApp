import "../App.css";
import {
  Typography,
  FormControl,
  Input,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    color: "black",
  },
});

const SearchToDo = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography>ToDo</Typography>
      <Typography>Search</Typography>
      <FormControl>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText className={classes.root} id="my-helper-text">
          Put your ToDos here.
        </FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};

export default SearchToDo;
