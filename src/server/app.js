const Koa = require("koa");
const favicon = require("koa-favicon");
const views = require("koa-views");

const app = new Koa();
// favicon
app.use(favicon(__dirname + "/favicon.ico"));

// views
app.use(views(__dirname, { autoRender: false, map: { html: "ejs" } }));

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
  } else {
    await next();
  }
});

// resopnse
app.use(async (ctx, next) => {
  switch (ctx.url) {
    case "/":
      ctx.state = {
        title: "Home",
        msg: "home~",
      };
      break;
    case "/user":
      ctx.body = "User";
      break;
    case "/login":
      ctx.state = {
        title: "Login",
        msg: "login~",
      };
      break;
    case "/about":
      ctx.state = {
        title: "About",
        msg: "about~",
      };
      break;
    default:
      break;
  }
  await next();
});

// 渲染
app.use(async (ctx) => {
  let html = await ctx.render("index");
  ctx.body = html;
});

app.listen(3000);
