import React from "react";
import FilterLink from "../containers/FilterLink";
import { Button } from "@material-ui/core";

const Footer = () => (
  <p>
    Show:{" "}
    <FilterLink filter="SHOW_ALL">
      <Button color="primary">All</Button>
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      <Button color="primary">Active</Button>
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      <Button color="primary">Completed</Button>
    </FilterLink>
  </p>
);

export default Footer;
