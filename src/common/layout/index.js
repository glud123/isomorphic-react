import React, { Component } from "react";
/**
 * Layout 组件
 */
export default class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // 整体项目页面级公共组件 例如 Header、Footer 等
    return this.props.children;
  }
}
