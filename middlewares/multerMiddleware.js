const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let folder = path.join(__dirname, '../public/img/');
        cb(null, folder);
    },
    filename: (req, file, cb)=>{
        //console.log(file);
        let imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

let upload = multer({ storage: storage });

module.exports = upload;