const mysqlModule = require('mysql');
const db = mysqlModule.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'mhwaccdb'
})

// 导出
module.exports = db;
