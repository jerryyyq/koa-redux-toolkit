import query from './lib/mysql-query'

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
    return query(sql);
}

