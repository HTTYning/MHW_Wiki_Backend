const expressModule = require('express');
const multer = require('multer');
const sd = require('silly-datetime');
const router = expressModule.Router();
const fs = require('fs');
const path = require('path');

const db = require('../connectPool')

const storage = multer.diskStorage({
    destination:function(req,res,cb) {
        cb(null,'public/images/userHeadImage/')
    },
    filename:function(req,file,cb){
        let userId = req.body.userId;
        let pointIndex = (file.originalname).lastIndexOf(".");
        let suffix = file.originalname.substring(pointIndex);
        let fileAfterName = getCurrentTimestamp()+'_'+rand(1000000000,9999999999)+'_'+userId+suffix;
        cb(null,fileAfterName);
    }
})
const upload = multer({
    storage
})

router.post("/user/uploadUserHeadImageName",upload.single('img'),(req,res)=>{
    let userId = req.body.userId;
    let fileAfterName = req.file.filename;
    let sqlSelectImageName = `select image_name from user_head_image WHERE user_id = ?`;
    db.query(sqlSelectImageName,[userId],(err,resultSelect)=>{
        if(err){
            console.log("查询图片名失败!" + err);
        }else{
            let imageName = resultSelect[0].image_name;
            if(imageName != ''){
                deleteImg(imageName);
            }
            let sqlUpdateImageName = `UPDATE user_head_image SET image_name = ? WHERE user_id = ?`
            db.query(sqlUpdateImageName,[fileAfterName,userId],(err,result)=>{
                if(err){
                    res.send({
                        code:405,
                        msg:'头像上传失败!',
                        data: false
                    });
                    console.log("路由: uploadUserHeadImageName;头像上传失败! " + err);
                }else{
                    res.send({
                        code:200,
                        msg:'头像上传成功!',
                        data: true
                    });
                }
            });
        }
    });
})


function getCurrentTimestamp() {
    var year = sd.format(new Date(), 'YYYY');
    var month = sd.format(new Date(), 'MM');
    var day = sd.format(new Date(), 'DD');
    var hour = sd.format(new Date(), 'HH');
    var min = sd.format(new Date(), 'mm');
    var sen = sd.format(new Date(), 'ss');
    let timeStr = `${year}-${month}-${day}_${hour}-${min}-${sen}`;
    return timeStr;
}
function rand(start,end){
    return Math.ceil(Math.random()*end)+start;
}
function deleteImg(fileAfterName) {
    const userHeadImageFolderPath = './public/images/userHeadImage';

    // 是否能打开文件夹
    fs.readdir(userHeadImageFolderPath, (err, files) => {
        if (err) {
            console.error('无法读取userHeadImage文件夹! ', err);
            return;
        }
        const imagePath = path.join(userHeadImageFolderPath, fileAfterName);
        // 删除操作
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`文件删除失败: ${imagePath}`, err);
            } else {
                console.log(`文件删除成功: ${imagePath}`);
            }
        });
    });
}

module.exports = router