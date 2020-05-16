import React from "react";
import { StaticRouter } from "react-router";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";
import StyleContext from "isomorphic-style-loader/StyleContext";
import AppRoute from "../../route";
import matchRoute from "@common/route/matchRoute";

const assetsMap = require("../../util/handleAssets.js")();
/**
 * react 同构中间件
 */
export default async (ctx, next) => {
  // 前端热更新时触发的 hot-update.json 的请求进行拦截
  if (ctx.path.indexOf("hot-update.json") > -1) {
    await next();
    return;
  }
  // 当前请求路径下组件查找、页面初始值处理、页面信息处理
  let targetRoute = matchRoute(ctx.path);
  let pageCom = require(`@client/${targetRoute.page}`).default;
  let initialData = null;
  if (pageCom.getInitialProps) {
    initialData = await pageCom.getInitialProps();
  }
  // 当前请求路径下页面css查找
  const cssSet = new Set(); // CSS for all rendered React components
  const insertCss = (...stylesItem) => {
    stylesItem.forEach((style) => {
      cssSet.add(style._getContent());
    });
  };
  // react 渲染当前请求路径页面
  const htmlDom = renderToString(
    <StaticRouter location={ctx.path} context={{ initialData }}>
      <StyleContext.Provider value={{ insertCss }}>
        <AppRoute component={pageCom} />
      </StyleContext.Provider>
    </StaticRouter>
  );
  // 当前请求路径页面 css 整理为内嵌样式
  let styles = [];
  [...cssSet].forEach((item) => {
    let [mid, content] = item[0];
    styles.push(`<style id="s${mid}-0">${content}</style>`);
  });
  // 当前请求路径页面下 seo 信息获取
  let { title, meta } = Helmet.renderStatic();
  // 将当前请求路径页面、样式、seo 信息、页面初始值进行数据注入
  ctx.state = {
    title: title,
    meta: meta,
    styles: styles.join(""),
    scripts: assetsMap.js.join(""),
    htmlDom: htmlDom,
    initialData: serialize(initialData, {
      spaces: 2,
      isJson: true,
      ignoreFuction: true,
    }),
  };
  let html = await ctx.render("index.html");
  ctx.body = html;
  await next();
};
