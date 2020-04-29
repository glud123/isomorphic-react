import React from "react";
import { StaticRouter } from "react-router";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import StyleContext from "isomorphic-style-loader/StyleContext";
import AppRoute from "./../../client/route/index.js";
import matchRoute from "./../../share/util/match-route.js";

export default async (ctx, next) => {
  let targetRoute = matchRoute(ctx.path);
  let fetchDataFunc = targetRoute.component.getInitialProps;
  let fetchResult = null;
  let context = {
    initialData: null,
    page: {
      tdk: {
        title: "默认标题",
        keywords: "默认关键词",
        description: "默认描述",
      },
    },
  };
  if (fetchDataFunc) {
    fetchResult = await fetchDataFunc();
    context.initialData = fetchResult.fetchData;
    context.page.tdk = fetchResult.page.tdk;
  }
  const css = new Set();
  const insertCss = (...styles) => {
    return styles.forEach((style) => {
      return css.add(style._getContent());
    });
  };

  const htmlDom = renderToString(
    <StaticRouter location={ctx.path} context={context}>
      <StyleContext.Provider value={{ insertCss }}>
        <AppRoute />
      </StyleContext.Provider>
    </StaticRouter>
  );
  // style 样式内容
  let styleContent = [];
  [...css].forEach((element) => {
    console.log;
    let [id, cssContent] = element[0];
    /**
     * s 标识为 isomorphic-style-loader 库中 insertCss 方法 prefix 参数默认值
     * -0 标识表示
     */
    styleContent.push(
      `<style type="text/css" id="s${id}-0">${cssContent}</style>`
    );
  });
  let { title, meta } = Helmet.renderStatic();
  ctx.state = {
    title: title,
    meta: meta,
    styles: styleContent.join(""),
    htmlDom: htmlDom,
    initialData: JSON.stringify(fetchResult),
  };
  let html = await ctx.render("index.html");
  ctx.body = html;
  // ctx.body = `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>Home</title>
  //   </head>
  //   <body>
  //     <div>home</div>
  //     <div id="app">${htmlDom}</div>
  //   </body>
  //   <script type="text/javascript" src="index.js"></script>
  // </html>`;
  await next();
};
