import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import withStyles from "isomorphic-style-loader/withStyles";
import homeData from "./../mock/homeData.js";
import homeLess from "./home.less";

class Home extends Component {
  constructor(props) {
    super(props);
    let initialData = props.initialData || {};
    let pageInfo = props.pageInfo || {};
    this.state = {
      tdk: pageInfo.tdk,
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
      pageInfo: {
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
      Home.getInitialProps().then(({ fetchData, pageInfo }) => {
        this.setState({
          listData: fetchData.data,
          tdk: pageInfo.tdk,
        });
      });
    }
  }
  render() {
    let { tdk = {} } = this.state;
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
        <div>数据列表</div>
        <div>{this.createList()}</div>
      </div>
    );
  }
}
Home = withStyles(homeLess)(Home);
export default Home;
