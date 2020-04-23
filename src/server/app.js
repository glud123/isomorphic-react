const Koa = require("koa");
const favicon = require("koa-favicon");

const app = new Koa();
// favicon
app.use(favicon(__dirname + "/favicon.ico"));

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

// 重定向
app.use(async (ctx, next) => {
  if (ctx.url === "/user") {
    ctx.redirect("/login");
  }else{
    await next();
  }
});

// resopnse
app.use(async (ctx) => {
  switch (ctx.url) {
    case "/":
      ctx.body = "hello world KOA";
      break;
    case "/user":
      ctx.body = "User";
      break;
    case "/login":
      ctx.body = "Login";
      break;
    default:
      break;
  }
});

app.listen(3000);
