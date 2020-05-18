import React from "react";

export default (SourceComponent) => {
  if (!SourceComponent.getInitialProps) {
    return SourceComponent;
  }
  return class InitData extends React.Component {
    constructor(props) {
      super(props);
    }
    static async getInitialProps(store) {
      await SourceComponent.getInitialProps(store);
    }
    async componentDidMount(){
      // 客户端非首次进入时，获取对应组件的 getInitialProps 方法
      if(!window.__INIT_STORE__){
        await SourceComponent.getInitialProps(window.__STORE__);
      }
    }
    render() {
      return <SourceComponent {...this.props} />;
    }
  };
};
