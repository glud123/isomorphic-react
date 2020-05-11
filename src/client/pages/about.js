import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageMap from "@assets/images/echarts.png";
import "./a.less";
class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link style={{ marginLeft: "10px" }} to="/demo">
          Demo
        </Link>
        <div className="page">About</div>
        <div>内容</div>
        <div>
          <img src={ImageMap} />
        </div>
      </div>
    );
  }
}
export default About;
