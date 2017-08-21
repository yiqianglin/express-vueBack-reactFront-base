import pool from './index';
import User from '../models/users';
import merge from 'merge';
import { jsonWrite, pageWrite } from '../utils/returnGeneartor';

const userSQLMapping = {
	queryAll: "SELECT * FROM `user`",
	queryById: "SELECT * FROM `user` WHERE `userId` = ?",
	addUser: ""
}

export default {
    showUser: function(req, res, callback, next) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            connection.query(userSQLMapping.queryAll, function(err, dbResult) {
                const result = [];
                if(dbResult) {
                    dbResult.forEach((item, index, arr) =>{
                        result.push(new User(item))
                    });
                }

                const resResult = merge({
                    code: '200',
                    msg: '查询成功'
                }, { result: JSON.stringify(result) });

                callback && callback(err, resResult);
                console.log(resResult.result);
                pageWrite(res, {title: '用户表', users: JSON.parse(resResult.result) }, 'users.html');
                
                // return next();
                // 释放连接
                connection.release();
            })
        });
    },
    showUserById: function(req, res, callback, next) {
    	const userId = + req.userId;
    	pool.getConnection(function(err, connection) {
            connection.query(userSQLMapping.queryById, userId, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
}