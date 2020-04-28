import React from "react";
import { StaticRouter, Route } from "react-router";
import { renderToString } from "react-dom/server";
import AppRoute from "./../../client/route/index.js";
import matchRoute from "./../../share/util/match-route.js";

export default async (ctx, next) => {
  let targetRoute = matchRoute(ctx.path);
  let fetchDataFunc = targetRoute.component.getInitialProps;
  let fetchResult = null;
  let context = {
    initialData: null,
  };
  if (fetchDataFunc) {
    fetchResult = await fetchDataFunc();
    context.initialData = fetchResult;
  }
  
  const htmlDom = renderToString(
    <StaticRouter location={ctx.path} context={context}>
      <AppRoute />
    </StaticRouter>
  );
  ctx.state = {
    title: "SSR",
    msg: "react-ssr 同构应用",
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
