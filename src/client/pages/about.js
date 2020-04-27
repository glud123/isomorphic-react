import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link style={{marginLeft:"10px"}} to="/demo">Demo</Link>
        <div>About</div>
      </div>
    );
  }
}
