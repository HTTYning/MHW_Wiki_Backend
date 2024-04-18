const expressModule = require('express');
const router = expressModule.Router();
const db = require('../connectPool')
const sd = require('silly-datetime');

router.post("/user/createAccount",(req,res)=>{
    let userName = req.body.userName;
    let userPhone = req.body.phone;
    let userPassword = req.body.password;
    let userEmail = req.body.email;
    let timeStemp = getCurrentTimeStampUseForDB();
    let sqlCreateAccount = `INSERT INTO user_info (user_name,user_phone,user_email,user_password ,create_time) VALUES (?, ?, ?, ?, ?)`;
    db.query(sqlCreateAccount,[userName,userPhone,userEmail,userPassword,timeStemp],(err,result)=>{
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
});
function getCurrentTimeStampUseForDB() {
    var year = sd.format(new Date(), 'YYYY');
    var month = sd.format(new Date(), 'MM');
    var day = sd.format(new Date(), 'DD');
    var hour = sd.format(new Date(), 'HH');
    var min = sd.format(new Date(), 'mm');
    var sen = sd.format(new Date(), 'ss');
    let timeStr = `${year}-${month}-${day} ${hour}:${min}:${sen}`;
    return timeStr;
}
module.exports = router;