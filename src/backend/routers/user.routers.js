const express = require("express");
const UserController = require('../controllers/user.controller');
const { Users, Address, Payments } = require('../db');

const addressController = new UserController(Address)
const paymentController = new UserController(Payments)

const userController = new UserController(Users)
const authMiddle = require('../middlewares/auth')
const router = express.Router();

// 유저 회원가입
router.post('/users/signup', userController.userSignup);
// 유저 로그인
router.post('/users/login', userController.userLogin);
//유저 로그아웃
router.get('/users/logout', authMiddle, userController.userLogout);
// 메일 보내기
router.post('/users/sendMail', userController.sendMail);
//마이페이지
router.get('/users/mypage', authMiddle, userController.userMypage);


//장바구니 불러오기
router.get('/users/cart', authMiddle, userController.getCartItem);
// 장바구니 추가
router.post('/users/cart', authMiddle, userController.addCartItem);
//장바구니 삭제
router.post('/users/cart/detail', authMiddle, userController.deleteCartItem);
//장바구니 수량 수정 (추가)
router.post('/users/cart/detail/:prodId', authMiddle, userController.updateCartItemQuantity)
//장바구니 불러올때 쓸거
router.get('/users/products', authMiddle, userController.callCartProductName)


// 결제부분 로그인정보 업데이트 필요(프론트 하면서 같이 할 예정)
//결제
router.post('/users/payment', paymentController.payment)
//결제 취소
router.post('/users/payment/cancel', paymentController.cancelPayment)

//주소 입력
router.post('/users/address', authMiddle, addressController.postAddress);
//주소 불러오기
router.get('/users/address', authMiddle, addressController.getAddress)
module.exports = router;
