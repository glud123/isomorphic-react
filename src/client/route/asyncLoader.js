import React from "react";
import compLoader from "../util/compLoader";
import LoadingComponent from "../components/LoadingComponent";
/**
 * 路由异步组件
 */
export default class AsyncLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: null,
    };
  }
  // 加载组件
  loadComponent = () => {
    this.setState(
      {
        mod: null,
      },
      () => {
        compLoader(this.props.page).then((mod) => {
          this.setState({
            mod: mod.default ? mod.default : mod,
          });
        });
      }
    );
  };
  componentDidMount() {
    if (!this.state.mod) {
      this.loadComponent();
    }
  }
  render() {
    let mod = this.state.mod || this.props.mod;
    return mod ? this.props.children(mod) : <LoadingComponent />;
  }
}
