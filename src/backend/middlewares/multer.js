const fs = require('fs');
const multer = require('multer');
const path = require('path');

try {
    fs.readdirSync(__dirname + '/../../frontend/public/uploads'); // 폴더 확인
} catch (err) {
    console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync(__dirname + '/../../frontend/public/uploads'); // 폴더 생성
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../frontend/public/uploads'); // 파일 저장 경로
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일이름 중복되지 않도록
    },
});
const multerUpload = multer({ storage: fileStorage }).single('productImage');

module.exports = multerUpload;
