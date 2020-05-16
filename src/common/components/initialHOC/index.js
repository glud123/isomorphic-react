/**
 * 组件数据初始化处理 高阶组件
 * - 进行页面初始值处理
 * - 进行同构样式处理
 */
import withStyles from "isomorphic-style-loader/withStyles";
import initDataCom from "./initDataCom";
export default (Argv) => {
  // 传入的为 样式 时，则需要再返回函数去接收组件
  if (Argv._insertCss) {
    return (SourceComponent) => {
      SourceComponent = withStyles(Argv)(SourceComponent);
      return initDataCom(SourceComponent);
    };
  } else {
    // 传入的为 组件 时
    return initDataCom(Argv);
  }
};
