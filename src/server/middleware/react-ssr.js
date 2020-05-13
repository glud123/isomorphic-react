import React from "react";
import { StaticRouter } from "react-router";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";
import AppRoute from "../route";
import matchRoute from "../../common/route/matchRoute";

const assetsMap = require("../util/handleAssets.js")();
/**
 * react 同构中间件
 */
export default async (ctx, next) => {
  if (ctx.path.indexOf("hot-update.json") > -1) {
    await next();
    return;
  }
  let targetRoute = matchRoute(ctx.path);
  let pageCom = require(`../../client/${targetRoute.page}`).default;
  let fetchDataFunc = pageCom.getInitialProps;
  let fetchResult = null;
  let initialData = {
    fetchData: null,
    pageInfo: {
      tdk: {
        title: "默认标题",
        keywords: "默认关键词",
        description: "默认描述",
      },
    },
  };
  if (fetchDataFunc) {
    fetchResult = await fetchDataFunc();
    initialData.fetchData = fetchResult.fetchData;
    initialData.pageInfo = fetchResult.pageInfo;
  }
  const htmlDom = renderToString(
    <StaticRouter location={ctx.path}>
      <AppRoute
        initialData={initialData.fetchData}
        pageInfo={initialData.pageInfo}
        component={pageCom}
      />
    </StaticRouter>
  );
  let { title, meta } = Helmet.renderStatic();
  ctx.state = {
    title: title,
    meta: meta,
    styles: assetsMap.css.join(""),
    scripts: assetsMap.js.join(""),
    htmlDom: htmlDom,
    initialData: serialize(fetchResult, {
      spaces: 2,
      isJson: true,
      ignoreFuction: true,
    }),
  };
  let html = await ctx.render("index.html");
  ctx.body = html;
  // ctx.body = `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     ${title}
  //     ${meta}
  //     ${assetsMap.css.join("")}
  //   </head>
  //   <body>
  //     <div id="app">${htmlDom}</div>
  //     <textarea id="ssrTextInitData" style="display:none">${JSON.stringify(fetchResult)}</textarea>
  //   </body>
  //   ${assetsMap.js.join("")}
  // </html>`;
  await next();
};
