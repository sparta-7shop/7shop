const express = require('express');

const UserController = require('../controllers/user.controller');
const {Users} = require('../db')

const authMidde = require('../middlewares/auth')
const userController = new UserController(Users)
const router = express.Router();


// // 유저 회원가입
router.post('/users/signup', userController.userSignup);
// // 유저 로그인
router.post('/users/login', userController.userLogin);
// //유저 로그아웃
router.get('/users/logout', userController.userLogout);
// // 메일 보내기
router.post('/users/sendMail', userController.sendMail);
// //마이페이지
router.get('/users/mypage', authMidde,userController.userMypage);

// //장바구니 불러오기
// router.get('/users/cart', userController.###);
// //장바구니 삭제
// router.post('/users/cart/:productId', userController.###);
// //장바구니 주문
// router.post('/users/cart/order', userController.###);

// //결제
// router.post('/users/payments', userController.###);
// //결제 취소
// router.post('/users/payments/cancel', userController.###);
// //주소 입력
// router.post('/users/address', userController.###);




module.exports = router;