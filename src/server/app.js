const Koa = require("koa");

const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  if (ctx.url != "/favicon.ico") {
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  }
});

// X-Response-Time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// resopnse
app.use(async (ctx) => {
  ctx.body = "hello world KOA";
});

app.listen(3000);
