module.exports = () => {
  let jsFiles = ["libs.js", "main.js"];
  let cssFiles = ["main.css"];
  const assets = {
    js: [],
    css: [],
  };
  if (__IS_PROD__) {
    // 生产环境
    const assetsMap = require("@dist/static/manifest.json");
    jsFiles.forEach((item) => {
      if (assetsMap[item]) {
        assets.js.push(
          `<script type="text/javascript"  src="${assetsMap[item]}"></script>`
        );
      }
    });
    cssFiles.forEach((item) => {
      if (assetsMap[item]) {
        assets.css.push(
          `<link rel="stylesheet" type="text/css" href="${assetsMap[item]}"/>`
        );
      }
    });
  } else {
    // 开发环境
    assets.js.push(
      `<script type="text/javascript" src="./index.js"></script>`
    );
    assets.css.push(
      `<link rel="stylesheet" type="text/css"  href="./main.css" />`
    );
  }
  return assets;
};
