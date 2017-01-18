const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


router.get('/', (ctx) => {
  ctx.body = { name: 'Johhny' };
});


app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  })
  .listen(3000);
