import React from "react";

export default (SourceComponent) => {
  if (!SourceComponent.getInitialProps) {
    return SourceComponent;
  }
  return class InitData extends React.Component {
    constructor(props) {
      super(props);
      this.initialData = props.staticContext
        ? null
        : window.__context__.initialData;
      this.state = {
        initialData: this.initialData,
      };
    }
    static async getInitialProps() {
      return await SourceComponent.getInitialProps();
    }
    async componentDidMount() {
      if (!this.state.initialData) {
        let initialData = await SourceComponent.getInitialProps();
        console.log(initialData);
        this.setState({
          initialData: initialData,
        });
      }
    }
    render() {
      let props = { initialData: null, ...this.props };
      if (this.props.staticContext) {
        // node端
        props.initialData = this.props.staticContext.initialData;
      } else {
        // 浏览器端
        if (this.initialData) {
          props.initialData = this.initialData;
          window.__context__.initialData = null;
        } else {
          props.initialData = this.state.initialData || {};
        }
      }
      return <SourceComponent {...props} />;
    }
  };
};
