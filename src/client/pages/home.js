import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to="/demo">Demo</Link>
        <Link to="/about" style={{marginLeft:"10px"}}>About</Link>
        <div>Home</div>
      </div>
    );
  }
}
