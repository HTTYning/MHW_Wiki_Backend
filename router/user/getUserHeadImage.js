const expressModule = require('express');
const router = expressModule.Router();

const db = require('../connectPool')

router.get("/user/getUserHeadImage",(req,res)=>{
    let userId = req.query.userId;
    let sqlSelectImageName = `select image_name from user_head_image WHERE user_id = ?`;
    db.query(sqlSelectImageName,[userId],(err,resultSelect)=>{
        if(err){
            res.send({
                code:405,
                msg:'获取头像图片名失败，请重试!'
            })
            console.log("获取头像图片名失败!" + err);
        }else{
            res.send({
                code:200,
                msg:'获取头像图片名成功!',
                data: resultSelect
            })
        }     
    });
})

module.exports = router