const knex = require('knex');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert'); // necessary until koa-generic-session has been updated to support koa@2
const session = require('koa-generic-session');
const passport = require('koa-passport');
require('dotenv').config();

const dataSource = knex(require('./knexfile')[process.env.NODE_ENV]);

const app = new Koa();
const router = new Router();

// body parser
app.use(bodyParser());

// Sessions

app.keys = ['secret'];
app.use(convert(session()));

app.use(passport.initialize());
app.use(passport.session());

router.get('/', (ctx) => {
  console.log(ctx.login());
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
