// import wrapper from 'co-mysql'
// import mysql from 'mysql'
import mysql from 'mysql-co'
import co from 'co'

var options = {
    host: '192.168.2.252',  // '192.168.2.252', 'localhost'
    user: 'yangyuqi',      // 'yangyuqi', 'jerry'
    password: '123456',
    database: 'yyqtestdb',
    port: 3306
}
/**
var pool = mysql.createPool(options);
var mysql_connect = wrapper(pool);

export default function* query( sql )
{
    var rows = yield mysql_connect.query(sql);
    var result = yield rows;
    result = JSON.stringify(result);
    console.log( "query rows = ", result );
    // var result = JSON.stringify(rows);
    console.log( "query sql = ", sql, " result = ", result );
    return result
};
 */

var pool = mysql.createPool(options)

export function mysql_query (sql)
{
    return co(function *()
    {
        var db = yield pool.getConnection()
        var result = yield db.query(sql)
        console.log('query sql = ', sql, ' result = ', result)
        db.release()  // db.end();
        return result
    })
}

export function mysql_execute (sql)
{
    return co(function *()
    {
        var db = yield pool.getConnection()
        var result = yield db.execute(sql)
        console.log('query sql = ', sql, ' result = ', result)
        db.release()  // db.end();
        return result
    })
}
