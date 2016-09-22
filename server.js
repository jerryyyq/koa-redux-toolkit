import koa from 'koa';
import ip from 'ip'
import Router from 'koa-router'
import StaticRouter from 'koa-static'
import KoaBody from 'koa-body'
import Session from 'koa-generic-session';
import RedisStore from 'koa-redis';

import { get_user_info, set_user_password, check_user_password } from './server/user-info'



var myRouter = new Router();

myRouter.all('/', function *(next)
{
    try
    {
  	    yield next;
    }
    catch(err)
    {
        console.log('/ server error = ', err);

	    this.status = err.status;
	    this.body = err.message;
    }
});

myRouter.get('/server/aaa', function *(next)
{
    console.log('/aaa 403');
    //this.throw(403, 'What are you doing? a');
    this.body = 'What are you doning?';
});

myRouter.all('/server/bbb', function *(next)
{
    console.log( '/bbb body = ', this.request.body );
    //this.throw(403, 'What are you doing? a');
    this.body = 'What are you doning?';
});

myRouter.get('/server/getuserinfo/:id', function *(next)
{
    console.log('/getuserinfo params = ', this.params.id);

    var result = yield get_user_info( this.params.id );

    this.response.set('Access-Control-Allow-Origin', '*');
    this.body = JSON.stringify( result[0] );
     console.log('/getuserinfo finish');
});

//curl -l -H "Content-type: application/json" -X POST -d '{"username":"YYQ","password":"1234","remember":true}' http://localhost:3001/server/checkuserlogin
myRouter.post('/server/checkuserlogin', function *(next)
{
    console.log( '/checkuserlogin this.params = ', this.params, ' body = ', this.request.body, ' session = ', this.session );
    let userinfo = JSON.parse( this.request.body );
    let result = yield check_user_password( userinfo.username, userinfo.password );
    if( result.id && userinfo.remember )
    {
        console.log('/checkuserlogin set cookies id = ', result.id);
        this.cookies.set( 'id', result.id, {signed: true} );
        //this.session
    }
    else
    {
        this.cookies.set('id');
        this.cookies.set('id.sig');
    }

    this.response.set('Access-Control-Allow-Origin', '*');
    this.body = JSON.stringify( result );
    console.log('/checkuserlogin finish, body = ', this.body);
});

myRouter.all('/server/userlogout', function *(next)
{
    let userid = this.cookies.get('id', {signed: true});
    console.log( '/userlogout userid = ', userid );
    this.cookies.set('id');
    this.cookies.set('id.sig');
    //this.session

    this.response.set('Access-Control-Allow-Origin', '*');
    this.body = '{}';
});

myRouter.get('/server/test/:id', function *(next)
{
    console.log('/test');
    this.body = 'test page, params = ' + this.params.id + " dir = " + __dirname;
});

myRouter.all('/server/', function *(next)
{
    console.log('/ccc 1');
    var cookie_name = this.cookies.get('name', { signed: true });
    console.log('/ccc cookie_name = ' + cookie_name);
    if( !cookie_name || 1 > cookie_name.length )
    {
	    this.cookies.set('name', 'tubie', { signed: true });
    }

    console.log('/ccc 2');
    this.body = 'Hello World cookie_name=' + cookie_name + this.url + " " + this.request.path + " " + this.request;
});

/* 
// koa-router 中间件示例，目前本框架中没有调用
app.use(function *(next)
{
    var start = new Date;
    try
    {
  	yield next;
    }
    catch(err)
    {
        log.error('server error', err);

	this.status = err.status;
	this.body = err.message;
    }

    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *(next)
{
    if( this.url == '/aaa' )
    {
	console.log('/aaa 403');
	this.throw(403, 'What are you doing?');
    }
    else
    {
	yield next;
    }
});
*/



var app = koa();

//var Keygrip = require('keygrip')
//app.keys = new Keygrip(['im a newer secret', 'i like turtle'], 'sha256');
app.keys = ['im a newer secret', 'i like turtle'];
/*
app.use(Session({
    key: 'test.sid',
    store: RedisStore({
        host: ,
        port: ,
        password: 
    }),
    ttl: 24*3600*1000,  //单位为 ms，可以直接写 毫秒数
    cookie: {
        httpOnly: true,
        path: '/',
        overwrite: true,
        signed: true,
        maxAge: null //one hour in ms
  }
}));
*/

app.on('error', function(err){
    console.log('server error = ', err);
});

app.use(KoaBody({formidable:{uploadDir: __dirname}}));
app.use(myRouter.routes());

//加载客户端文件 
app.use(StaticRouter(__dirname + '/client'));

app.listen(3001);

const localip = ip.address()
console.log(`koa web server running at: http://${localip}:3001/, dirname = ${__dirname}`);



