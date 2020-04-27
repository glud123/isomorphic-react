import React, { Component } from "react";
import { Link } from "react-router-dom";
import homeData from "./../mock/homeData.js";
export default class Home extends Component {
  constructor(props) {
    super(props);
    let initialData =
      (props.staticContext && props.staticContext.initialData) ||
      props.initialData ||
      {};
    this.state = {
      pageTitles: "Home View",
      listData: initialData.data,
    };
  }
  static getInitialProps() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: homeData,
        });
      }, 500);
    });
  }
  render() {
    let { pageTitles, listData } = this.state;
    return (
      <div>
        <div>
          <Link to="/demo">Demo</Link>
          <Link to="/about" style={{ marginLeft: "10px" }}>
            About
          </Link>
        </div>
        <div>{pageTitles}</div>
        <div>
          {listData && listData.length > 0
            ? listData.map((item, index) => {
                return (
                  <div key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                );
              })
            : "暂无数据"}
        </div>
      </div>
    );
  }
}
