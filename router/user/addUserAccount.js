const expressModule = require('express');
const router = expressModule.Router();
const db = require('../connectPool')


router.post("/user/createAccount",(req,res)=>{
    let userId = req.body.userId;
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;
    let userEmail = req.body.userEmail;
    let sqlCreateAccount = `INSERT INTO user_info (user_name, user_password, user_email,create_time) VALUES (?, ?, ?, ?)`;
    db.query(sqlCreateAccount,[userName,userPassword,userEmail],(err,result)=>{
        if(err){
            res.send({
                code:405,
                msg:'创建账户失败!'
            })
            console.log("创建账户失败!" + err);
        }else{
            res.send({
                code:200,
                msg:'创建账户成功!',
                data: result
            })
        }
    });
})

module.exports = router;