import React from "react";
import { Link } from "react-router-dom";
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  handelClick = () => {
    alert("SSR点击!!!");
  };
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about" style={{marginLeft:"10px"}}>About</Link>
        </div>
        <div>Demo</div>
        <h1 onClick={this.handelClick}>点击</h1>
      </div>
    );
  }
}
