const Koa = require("koa");
const favicon = require("koa-favicon");
const views = require("koa-views");
const koaStatic = require("koa-static");
const react_ssr = require("./middleware/react-ssr.js");
const { nodeServerPort } = require("./../common/pro-config.js");

const app = new Koa();

// favicon
app.use(favicon("./favicon.ico"));

// views
app.use(views("./template", { autoRender: false, map: { html: "ejs" } }));

// 静态资源加载
app.use(koaStatic("./dist/static"));

// logger
app.use(async (ctx, next) => {
  await next();
  if (ctx.path.indexOf("hot-update.json") > -1) {
    return;
  }
  const rt = ctx.response.get("X-Response-Time");
  console.table(
    [{ method: ctx.method, path: ctx.url, time: rt }],
    ["method", "path", "time"]
  );
});

// X-Response-Time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  if (ctx.path.indexOf("hot-update.json") > -1) {
    return;
  }
  const ms = new Date() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// react ssr
app.use(react_ssr.default);

app.listen(nodeServerPort, () => {
  console.log(`server start on http://localhost:${nodeServerPort}`);
});
