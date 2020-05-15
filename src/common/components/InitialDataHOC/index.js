/**
 * 组件数据初始值处理 高阶组件
 */
import React from "react";
export default (Component) => {
  return class InitialDataHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        initialData: null,
        pageInfo: null,
      };
    }
    async componentDidMount() {
      if (!this.state.initialData && Component.getInitialProps) {
        await Component.getInitialProps().then(({ initialData, pageInfo }) => {
          this.setState({
            initialData: initialData,
            pageInfo: pageInfo,
          });
        });
      }
    }
    render() {
      const props = {
        ...this.props,
        ...this.state,
      };
      return <Component {...props} />;
    }
  };
};
