const knex = require('knex');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert'); // necessary until koa-generic-session has been updated to support koa@2
const session = require('koa-generic-session');
const passport = require('koa-passport');
require('dotenv').config();

const dataSource = knex(require('./knexfile')[process.env.NODE_ENV]);
const userRepository = require('./lib/repositories/user-repository')(dataSource);
const timerRepository = {
  getAll: () => new Promise((resolve) => resolve([{ a: 12 }]))
};

const app = new Koa();
const router = new Router();

// body parser
app.use(bodyParser());

// Sessions

app.keys = ['secret'];
app.use(convert(session()));

app.use(passport.initialize());
app.use(passport.session());

router.get('/', ctx => {
  ctx.body = { name: 'Johhny' };
});

router.get('/timers', async (ctx) => {
  const timers = await timerRepository.getAll(12);
  ctx.body = timers;
});

router.post('/timers', async (ctx, next) => {
  const timer = await timerRepository.create(Object.assign({}, ctx.params, {
    user_id: ctx.state.user.id
  }));
  ctx.body = timer;
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
  .listen(3001);
