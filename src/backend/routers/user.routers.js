const express = require('express');

const UserController = require('../controllers/user.controller');
const { Users, Address, Payments } = require('../db')
const addressController = new UserController(Address)
const paymentController = new UserController(Payments)

const router = express.Router();

// // 유저 회원가입
// router.post('/users/signup', userController.###);
// // 유저 로그인
// router.post('/users/login', userController.###);
// //유저 로그아웃
// router.post('/users/logout', userController.###;
// //마이페이지
// router.post('/users/mypage', userController.###);


// //장바구니 불러오기
// router.get('/users/cart', userController.###);
// //장바구니 삭제
// router.post('/users/cart/:productId', userController.###);
// //장바구니 주문
// router.post('/users/cart/order', userController.###);

//결제
// router.post('/users/payments', paymentController.###);
// //결제 취소
// router.post('/users/payments/cancel', userController.###);
//주소 입력
router.post('/users/address', addressController.postAddress);




module.exports = router;