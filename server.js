import koa from 'koa';
import ip from 'ip'
import Router from 'koa-router'
import StaticRouter from 'koa-static'
//var StaticRouter = require('koa-static');

import { get_user_info } from './server/user-info'

var app = koa();

//var Keygrip = require('keygrip')
//app.keys = new Keygrip(['im a newer secret', 'i like turtle'], 'sha256');
app.keys = ['im a newer secret', 'i like turtle'];

app.on('error', function(err){
    log.error('server error', err);
    console.log('server error - %s', err);
});



var myRouter = new Router();

myRouter.all('/', function *(next)
{
    try
    {
  	    yield next;
    }
    catch(err)
    {
        log.error('server error', err);
        console.log('server error - %s', err);

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

myRouter.get('/server/getuserinfo/:id', function *(next)
{
    console.log('/getuserinfo params = ', this.params.id);

    var result = yield get_user_info( this.params.id );
    this.body = JSON.stringify( result[0] );
     console.log('/getuserinfo finish');
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



app.use(myRouter.routes());

//加载客户端文件 
app.use(StaticRouter(__dirname + '/client'));

app.listen(3001);

const localip = ip.address()
console.log(`koa web server running at: http://${localip}:3001/, dirname = ${__dirname}`);



