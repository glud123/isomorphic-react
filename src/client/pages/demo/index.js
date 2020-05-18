import React from "react";
import initialHOC from "@common/components/initialHOC";
import { updateData } from "@redux/demo/action";
import { Link } from "react-router-dom";
class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  handelClick = () => {
    alert("SSR点击测试");
  };
  static async getInitialProps(store) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: { a: "数据", b: "模拟" },
        });
      }, 300);
    }).then(({ code, data }) => {
      store.dispatch(updateData(data));
    });
  }
  render() {
    let { pageData } = this.props;
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
        {pageData && (
          <div>
            {pageData.a} - {pageData.b}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ demoReucer }) => ({ pageData: demoReucer.pageData });
Demo = initialHOC(Demo, {
  mapStateToProps: mapStateToProps,
});
export default Demo;
