// 查询用户字符串

const db = require('../connectPool')
db.query("select * from user_info where user_name = ?",userName,(err,result)=>{
    if(err){
        console.log("查询用户名失败!" + err);
        return err;
    }else{
        selectResult = result;
        if(result.length === 0){
            return -1;
        }else{
            return result[0].id;
        }
    }
});