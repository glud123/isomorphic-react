import React from "react";
import { StaticRouter } from "react-router";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import AppRoute from "./../../client/route/index.js";
import matchRoute from "./../../share/util/match-route.js";
const getAssets = require("./../common/assets.js");
const assetsMap = getAssets();
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
  const htmlDom = renderToString(
    <StaticRouter location={ctx.path} context={context}>
      <AppRoute />
    </StaticRouter>
  );
  let { title, meta } = Helmet.renderStatic();
  ctx.state = {
    title: title,
    meta: meta,
    styles: assetsMap.css.join(""),
    scripts: assetsMap.js.join(""),
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
