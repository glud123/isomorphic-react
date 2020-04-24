import React from "react";

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  handelClick = () => {
    alert("SSR点~~~~");
  };
  render() {
    return (
      <div>
        <h1 onClick={this.handelClick}>点击</h1>
      </div>
    );
  }
}
