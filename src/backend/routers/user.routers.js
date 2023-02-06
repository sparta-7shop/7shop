const express = require("express");
const UserController = require('../controllers/user.controller');
const { Users, Address, Payments } = require('../db')

const addressController = new UserController(Address)
const paymentController = new UserController(Payments)

const userController = new UserController(Users)
const authMiddle = require('../middlewares/auth')
const router = express.Router();

// // 유저 회원가입
router.post('/users/signup',  userController.userSignup);
// // 유저 로그인
router.post('/users/login', userController.userLogin);
// //유저 로그아웃
router.get('/users/logout', authMiddle, userController.userLogout);
// // 메일 보내기
router.post('/users/sendMail', userController.sendMail);
// //마이페이지
router.get('/users/mypage', authMiddle,userController.userMypage);




//장바구니 불러오기
// # 현재 # req.params로 받아옴, 후에 로그인 구현되면 파라미터로 받아오는거 없애고
//다시 받아넣어야함~
router.get('/users/cart/:userId', userController.getCartItem);
// 장바구니 추가
router.post('/users/cart/:userId', userController.addCartItem);
//장바구니 삭제
router.post('/users/cart/detail/:userId', userController.deleteCartItem);
//장바구니 수량 수정 (추가)
router.post('/users/cart/detail/:userId/:prodId', userController.updateCartItemQuantity)


//결제
router.post('/users/payment', paymentController.payment)
//결제 취소
router.post('/users/payment/cancel', paymentController.cancelPayment)
//주소 입력
router.post('/users/address', addressController.postAddress);
//주소 불러오기
router.get('/users/address/:userId', addressController.getAddress)
module.exports = router;
