const express = require('express')
const cookieParser = require('cookie-parser')
const { sequelize } = require('./db');
const path = require('path')
const morgan = require('morgan');
const port = 3000
const app = express()
const adminRoutes = require('./routers/admin.routers.js');
const productRoutes = require('./routers/product.routers.js');
const userRoutes = require('./routers/user.routers.js')
//머지 테스트
// app.set('view engine', 'html');

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.set('views', __dirname + '/../frontend/views')
app.engine('html', require('ejs').renderFile)
app.use(express.static(path.join(__dirname + '/../frontend/public'))); // 정적파일, 이미지파일
app.use(express.static(path.join(__dirname + '/../frontend/views'))); // 정적파일, 이미지파일
app.use(morgan('dev'));
app.use('/', [adminRoutes, productRoutes, userRoutes])



app.get('/', (req, res) => {
    res.render('payment.html')
})
app.get('/product', (req, res) => {
    res.render('product.html')
})




sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공!');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(port, () => { console.log(`${port}번 포트로 연결됐습니다`); })
