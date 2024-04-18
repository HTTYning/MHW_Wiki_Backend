const expressModule = require('express');
const bodyParser = require('body-parser');

const server = expressModule();

server.use(bodyParser.json());

// 静态资源托管
server.use(expressModule.static('public'))

// 验证用户名是否存在
// input:用户名
// output:布尔值
const selectUserNameIsExist = require('./router/user/selectUserNameIsExist.js')
server.use(selectUserNameIsExist);

// 创建账户
const addUserAccount = require('./router/user/addUserAccount.js')
server.use(addUserAccount);

// 登录，成功则返回用户名
const loginGetName = require('./router/user/loginGetName.js')
server.use(loginGetName);

// 创建用户头像数据
const addUserHeadImage = require('./router/user/addUserHeadImage.js')
server.use(addUserHeadImage);

// 更新用户头像
const uploadUserHeadImage = require('./router/user/uploadUserHeadImage.js')
server.use(uploadUserHeadImage);

// 获取用户头像
const getUserHeadImage = require('./router/user/getUserHeadImage.js')
server.use(getUserHeadImage);


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

const db = require('./router/connectPool.js')
server.get("/user/get",(req,res)=>{
    db.query("select * from test",(err,result)=>{
        if(err){
            console.log("查询用户名失败!" + err);
            return err;
        }else{
            res.send({
                code:200,
                msg:'成功!',
                data: result
            })
        }
    });
})

server.get('/', (req, res) => {  
    res.send('???????? ! ????????');  
}); 
server.listen(1145,()=>{
    console.log("怪物猎人:世界维基后端在端口1145启动!");
})