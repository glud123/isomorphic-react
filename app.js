const Koa = require("koa");
const favicon = require("koa-favicon");
const views = require("koa-views");
const koaStatic = require("koa-static");
const path = require("path");
const react_ssr = require("./dist/src/server/middleware/react-ssr.js").default;

const app = new Koa();

// favicon
app.use(favicon(__dirname + "/favicon.ico"));

// views
app.use(views(__dirname, { autoRender: false, map: { html: "ejs" } }));

// 静态资源加载
app.use(koaStatic(path.join(__dirname, "./dist/static")));

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// X-Response-Time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// react ssr
app.use(react_ssr);

app.listen(3004, () => {
  console.log("server start on 3004");
});
