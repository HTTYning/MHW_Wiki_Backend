const expressModule = require('express');
const router = expressModule.Router();
const db = require('../connectPool')

router.post("/user/addUserHeadImageData",(req,res)=>{
    let userId = req.body.userId;
    console.log(userId);
    let sqlCreateUserHeadImageData = `INSERT INTO user_head_image (user_id,image_name) VALUES (?,?)`;
    db.query(sqlCreateUserHeadImageData,[userId,''],(err,result)=>{
        if(err){
            res.send({
                code:405,
                msg:'创建图片数据失败!'
            })
            console.log("创建图片数据失败!" + err);
        }else{
            res.send({
                code:200,
                msg:'创建图片数据成功!',
                data: result
            })
        }
    });
});
module.exports = router;