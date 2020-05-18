/**
 * 组件数据初始化处理 高阶组件
 * - 进行页面初始值处理
 * - 进行同构样式处理
 */
import withStyles from "isomorphic-style-loader/withStyles";
import initDataCom from "./initDataCom";
import connectReduxCom from "./connectReduxCom";
export default (SourceComponent, options = {}) => {
  if (options.css) {
    // 处理 css
    SourceComponent = withStyles(options.css)(SourceComponent);
  }
  // 处理 redux
  if (options.mapStateToProps || options.mapDispatchToProps) {
    SourceComponent = connectReduxCom(options, SourceComponent);
  }
  return initDataCom(SourceComponent);
};
