const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index = require('./routes/index')
const users = require('./routes/users')
const crypto = require('crypto')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(async (ctx, next) => {
//   for ( var i = 0; i < 100000000; i++ ) {
//     var user       = {};
//     user.name  = 'outmem';
//     user.pass  = '123456';
//     user.email = 'outmem[@outmem](/user/outmem).com';
// }
  // window.handler = window.setInterval(function () {
  //   if (typeof AMap) {
  //     _this.renderMap('', AMap);
  //     window.clearInterval(window.handler);
  //   }
  // }, 300);
  // setTimeout(() => {
  //   console.log('>>>>>');
  // }, 10);
  // ctx.set('etag', '1212')
  // update(this.body).digest('hex');
  // ctx.set('cache-control', 'max-age=10000');
  // ctx.set('cache-control', 'max-age=0, must-revalidate')
  // ctx.set('etag', '1212')
  // ctx.res.statusCode = 304;
  // ctx.lastModified = new Date('2017/12/12 12:12:12 GMT')
  // ctx.etag =
  // ctx.set('expires', new Date('2018/2/12 12:12:12 GMT'));
  await next();
})
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app
