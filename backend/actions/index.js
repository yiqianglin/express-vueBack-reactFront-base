import mysql from 'mysql';
import { mysql_con } from '../config/db';
import merge from 'merge';

var pool  = mysql.createPool(merge({}, mysql_con));

pool.getConnection(function (err, connection) {
    if(err){
        console.log("Database connect error");
    }
});

/*pool.on('connection', function (connection) {
  console.log('pool on connection');
});

pool.on('acquire', function (connection) {
  console.log('pool on acquire');
});
*/

export default pool;