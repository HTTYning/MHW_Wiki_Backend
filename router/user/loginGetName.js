const expressModule = require('express');
const router = expressModule.Router();
const db = require('../connectPool')

// 登录，成功返回用户名

router.post("/user/login",(req,res)=>{
    let userPhone = req.body.phone;
    let userPassword = req.body.password;
    let userEmail = req.body.email;
    let isEmailLogin = req.body.isEmailLogin;
    let sqlSelectUserName;
    console.log(userEmail);
    console.log(userPhone);
    console.log(userPassword);

    if(isEmailLogin){
        sqlSelectUserName = `select id,user_name from user_info WHERE user_email = ? and user_password = ?`;
        db.query(sqlSelectUserName,[userEmail,userPassword],(err,result)=>{
            if(err){
                res.send({
                    code:405,
                    msg:'查询失败!'
                })
                console.log("查询失败!" + err);
            }else{
                res.send({
                    code:200,
                    msg:'查询成功!',
                    data: result
                })
            }
        });
    }else{
        sqlSelectUserName = `select id,user_name from user_info WHERE user_phone = ? and user_password = ?`;
        db.query(sqlSelectUserName,[userPhone,userPassword],(err,result)=>{
            if(err){
                res.send({
                    code:405,
                    msg:'查询失败!'
                })
                console.log("查询失败!" + err);
            }else{
                res.send({
                    code:200,
                    msg:'查询成功!',
                    data: result
                })
            }
        });
    }
});

module.exports = router;