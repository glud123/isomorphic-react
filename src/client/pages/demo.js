import React from "react";
import initialHOC from "@common/components/initialHOC";
import { Link } from "react-router-dom";
class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  handelClick = () => {
    alert("SSR点击测试");
  };
  static async getInitialProps() {
    let fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 0,
            data: { a: 111111111, b: 2222222222222 },
          });
        }, 300);
      }).then(({ code, data }) => {
        return data;
      });
    };
    return {
      initData: await fetchData(),
      pageInfo: {
        tdk: {
          title: "首页",
          keywords: "前端技术江湖",
          description: "前端技术江湖",
        },
      },
    };
  }
  render() {
    let { initData } = this.props.initialData;
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about" style={{ marginLeft: "10px" }}>
            About
          </Link>
        </div>
        <div>Demo 数据测试</div>
        <h1 onClick={this.handelClick}>点击我吧</h1>
        {initData && (
          <div>
            {initData.a} - {initData.b}
          </div>
        )}
      </div>
    );
  }
}
Demo = initialHOC(Demo);
export default Demo;
