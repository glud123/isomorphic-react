import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import initialHOC from "@common/components/initialHOC";
import { updateListData } from "@redux/home/action";
import homeData from "../../mock/homeData.js";
import homeLess from "./index.less";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps(store) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: homeData,
        });
      }, 300);
    }).then(({ code, data }) => {
      store.dispatch(updateListData(data));
    });
  }
  createList = (listData) => {
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
  render() {
    let { pageInfo, listData } = this.props;
    return (
      <div className="page">
        {pageInfo && (
          <Helmet>
            <title>{pageInfo.tdk.title}</title>
            <meta name="keywords" content={pageInfo.tdk.keywords} />
            <meta name="description" content={pageInfo.tdk.description} />
          </Helmet>
        )}
        <div className="container">
          <Link to="/demo">Demo</Link>
          <Link to="/about" style={{ marginLeft: "10px" }}>
            About
          </Link>
        </div>
        <div>数据列表</div>
        <div>{listData && this.createList(listData)}</div>
      </div>
    );
  }
}
const mapStateToProps = ({ homeReucer }) => ({
  pageInfo: homeReucer.pagingInfo,
  listData: homeReucer.listData,
});

const mapDispatchToProps = (dispatch) => ({
  updateListData: (data) => {
    return dispatch(updateListData(data));
  },
});
Home = initialHOC(Home, {
  css: homeLess,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
});
export default Home;
