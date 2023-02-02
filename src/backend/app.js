const express = require('express')
const cookieParser = require('cookie-parser')
const { sequelize } = require('./db');
const path = require('path')

const port = 3000
const app = express()
const adminRoutes = require('./routers/admin.routers.js');
const productRoutes = require('./routers/product.routers.js');
const userRoutes = require('./routers/user.routers.js')

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/view'))); // 정적파일, 이미지파일
app.use(express.static(path.join(__dirname, '../frontend/public'))); // 정적파일, 이미지파일

app.use('/', [adminRoutes, productRoutes, userRoutes])


sequelize
    .sync({ force: true })
    .then(() => {
        console.log('데이터베이스 연결 성공!');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(port, () => { console.log(`${port}번 포트로 연결됐습니다`); })
