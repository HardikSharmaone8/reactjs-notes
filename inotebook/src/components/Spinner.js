import React, { Component } from "react";
import spinner from "./spinner.gif";

export class Spinner extends Component {
  render() {
    return (
      <center>
        <img src={spinner} alt="loading..." />
      </center>
    );
  }
}

export default Spinner;
