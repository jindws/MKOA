const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const routes = require('./routes');


app.use(routes())

/**
 * ejs
 */

const render = require('koa-ejs');
const path = require('path');
render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});

/**
 * 静态资源
 */
const convert = require('koa-convert')
const static = require('koa-static')
// 由于koa-static目前不支持koa2
// 所以只能用koa-convert封装一下
app.use(convert(static(path.join(__dirname, './node_modules/bootstrap/dist'))));
app.use(convert(static(path.join(__dirname, './node_modules/vue/dist'))));
app.use(convert(static(path.join(__dirname, './node_modules/jquery/dist'))));

app.listen(9001);

// lsof -i:9000
