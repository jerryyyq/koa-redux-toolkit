import {mysql_query, mysql_execute} from './lib/mysql-query'
import crypto from 'crypto'

const ITERATION_TIMES = 1000;
const KEY_LENGTH = 256;
/*
export function get_user_info( userid )
{
    let sql = "SELECT * FROM user"
    if( !undefined === userid )
        sql += " WHERE id = " + userid

    console.log( "select_user_info, sql = ", sql );

    return new Promise( (resolve, reject) =>
    {
        query(sql, function(err, rows, fields)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                console.log( rows );
                let result = JSON.stringify(rows);
                console.log( result );
                resolve( result );
            }
        })
    })
}
*/

export function get_user_info ( userid )
{
    console.log("userid = ", userid)
    //debugger
    let sql = "SELECT * FROM user"
    if( undefined !== userid )
        sql += " WHERE id = " + userid

    console.log("sql = ", sql)
    return mysql_query(sql);
}

export function set_user_password( userid, password )
{
    let salt = crypto.randomBytes(16).toString('hex');
    let password_hash = crypto.pbkdf2Sync(password, salt, ITERATION_TIMES, KEY_LENGTH).toString('hex');

    let sql = "UPDATE user SET salt = '" + salt + "' password = '" + password_hash + "' WHERE id = " + userid;

    return mysql_query(sql);
}

export function check_user_password( username, password )
{
    let sql = "SELECT salt, password FROM user WHERE name = '" + username + "'"
    let result = mysql_query(sql); //await
    if( undefined == result[0] )
        return false;

    console.log("result[0] = ", result[0])
    let salt = result[0].salt;
    let password_hash = crypto.pbkdf2Sync(password, salt, ITERATION_TIMES, KEY_LENGTH).toString('hex');
    if(result[0].password === password_hash)
        return true;
    else
        return false;
}