const Router = require('koa-router')

let login = new Router();

login.get('/', async ctx => {
    await ctx.render('login', {title: '登录'});
})
let indexdata;

const {toLogin,toRegist,registIn} = require('./mongo/user');
login.post('/loginNow', async ctx => {
    const request = JSON.parse(Object.keys(ctx.request.body));
    await toLogin(request).then(data => {
        data = JSON.parse(JSON.stringify(data));
        ctx.body = {
            status: 0,
            result: '成功',
            data: indexdata = data
        }
    }, () => {
        ctx.body = {
            status: 1,
            result: '登录失败'
        }
    })
})

let regist = new Router();

regist.get('/', async ctx => {
    await ctx.render('regist', {title: '注册'});
})

regist.post('/registNow', async ctx => {
    const request = JSON.parse(Object.keys(ctx.request.body));
    await toRegist(request).then(data => {
        data = JSON.parse(JSON.stringify(data));
        ctx.body = {
            status: 1,
            result: '用户名已被使用'
        }
    }, async () => {
        await registIn(request).then(data=>{
          ctx.body = {
              status: 0,
              result: '注册成功'
          }
        },data=>{
          ctx.body = {
              status: 1,
              result: '注册失败'
          }
        })
    })
});

async function join(name) {
    return new Promise((resolve, reject) => {
        TestModel.create({
            name,
            data: Date.now()
        }, (error, doc) => {
            if (error) {
                reject(error);
            } else {
                resolve(doc)
            }
        });
    })

}

let router = new Router();
router.use('/login', login.routes());
router.use('/regist', regist.routes());

/**
 * 主页
 */
let indexroute = new Router();
indexroute.get('index', async ctx => {
    await ctx.render('index', {indexdata, title: '主页'});
})
router.use('/', indexroute.routes());

module.exports = () => router.routes();
