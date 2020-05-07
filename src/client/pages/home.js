import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import homeData from "./../mock/homeData.js";
import "./home.less";

class Home extends Component {
  constructor(props) {
    super(props);
    let initialData =
      (props.staticContext && props.staticContext.initialData) ||
      props.initialData ||
      {};
    let page =
      (props.staticContext && props.staticContext.page) || props.page || {};
    this.state = {
      tdk: page.tdk,
      listData: initialData.data,
    };
  }
  static async getInitialProps() {
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 0,
            data: homeData,
          });
        }, 300);
      });
    };
    return {
      fetchData: await fetchData(),
      page: {
        tdk: {
          title: "首页",
          keywords: "前端技术江湖",
          description: "前端技术江湖",
        },
      },
    };
  }
  createList = () => {
    let { listData } = this.state;
    if (listData && listData.length > 0) {
      return listData.map((item, index) => {
        return (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        );
      });
    } else {
      return "暂无数据";
    }
  };
  componentDidMount() {
    if (!this.state.listData) {
      Home.getInitialProps().then(({ fetchData, page }) => {
        this.setState({
          listData: fetchData.data,
          tdk: page.tdk,
        });
      });
    }
  }
  render() {
    let { tdk = {} } = this.state;
    // console.log(tdk, l._getContent())
    return (
      <div className="page">
        <Helmet>
          <title>{tdk.title}</title>
          <meta name="keywords" content={tdk.keywords} />
          <meta name="description" content={tdk.description} />
        </Helmet>
        <div className="container">
          <Link to="/demo">Demo</Link>
          <Link to="/about" style={{ marginLeft: "10px" }}>
            About
          </Link>
        </div>
        <div>{this.createList()}</div>
      </div>
    );
  }
}

export default Home;
