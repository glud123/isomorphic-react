/**
 * 组件按钮加载方法
 * @param {*} page 页面相对路径
 */
const compLoader = (page) => {
  return import(`../${page}`);
};

export default compLoader;
