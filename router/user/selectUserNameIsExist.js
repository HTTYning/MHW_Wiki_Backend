const expressModule = require('express');
const router = expressModule.Router();

// 查询用户字符串

const db = require('../connectPool')
router.post("/user/selectUserNameIsExist",(req,res)=>{
    // 根据请求的用户名查询此用户名是否存在，不存在返回false，存在则返回true
    let userName = req.body.userName;
    db.query("select * from user_info where user_name = ?",userName,(err,result)=>{
        if(err){
            console.log("查询用户名失败!" + err);
            return err;
        }else{
            selectResult = result;
            if(result.length === 0){
                res.send({
                    code:200,
                    msg:'该用户名可使用!',
                    data: false
                })
                return false;
            }else{
                res.send({
                    code:200,
                    msg:'该用户名已存在!',
                    data: true
                })
                return true;
            }
        }
    });
})

module.exports = router;