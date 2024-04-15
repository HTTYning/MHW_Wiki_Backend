const expressModule = require('express');
const bodyParser = require('body-parser');

const server = expressModule();

server.use(bodyParser.json());


const addUserAccount = require('./router/user/addUserAccount.js')
server.use(addUserAccount);

// const db = require('./router/connectPool')
// db.end();

// const db = require('./router/connectPool.js')
// db.query("select * from test",(err,result)=>{
//     if(err){
//         console.log("数据库连接失败! reason: " + err);
//     }else{
//         console.log("数据库可正常连接!");
//         console.log(result);
//     }
// })
server.get('/', (req, res) => {  
    res.send('Hello World!');  
}); 
server.listen(8080,()=>{
    console.log("怪物猎人:世界维基后端启动!");
})