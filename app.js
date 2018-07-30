const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
app.use(koaBody());

// crossOrigin
// const cors = require('koa2-cors')
// app.use(cors())

// console
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`);
  console.info(`${ctx.method} ${ctx.url} - ${ms}`)
});

const path = require('path')
serve = require("koa-static")
app.use(serve(path.join(__dirname, "/public")))

// error
app.on('error', async (err, ctx) => {
  if (ctx.url == '/favicon.ico') {
    console.info('get favicon.ico');
    return
  }
  /*
   * Source code
     // default to 500
     if ('number' != typeof err.status || !statuses[err.status]) err.status = 500;
     // respond
     const code = statuses[err.status];
     const msg = err.expose ? err.message : code;
     this.status = err.status;
     this.length = Buffer.byteLength(msg);
     this.res.end(msg);
   */

  // delelopment
  // err.expose = true;
  // err.status = err.status || 500;
  // err.message = err.status > 500 ? 'Internal Server Error' : err.message
  
  // production
  // err.expose = true;
  // err.status = err.status || 500;
  // err.message = err.status >= 500 ? 'Internal Server Error' : err.message
  // err.message = err.status < 500 ? err.message : 'Internal Server Error'

  console.error(err.stack ? err.stack : err)
});

process.on("uncaughtException", function (err) {
  console.error(err.stack ? err.stack : err);
});

process.on("unhandledRejection", function (err, r) {
  console.error(err.stack ? err.stack : err, r);
});

app.listen(3000)
app.listen(3001)

console.info('listening on port 3000 and 3001')