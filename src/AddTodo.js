import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "./actions";
import { Button, Input } from "@material-ui/core";
import "./App.css";

const AddTodo = ({ dispatch }) => {
  const [data, setData] = useState("");

  const handleSubmit = () => {
    dispatch(addTodo(data));
    setData("");
  };

  return (
    <div>
      <Input
        style={{ marginRight: "5px" }}
        id="name"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default connect()(AddTodo);
