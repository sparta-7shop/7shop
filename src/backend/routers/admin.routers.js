const express = require('express');

const AdminController = require('../controllers/admin.controller');
const adminModel = require('../db/admin.model')
const adminController = new AdminController(adminModel)


const router = express.Router();


//회원 삭제(관리자)
router.post('/admin/users/:userId', adminController.deleteUser);
//상품 수정(관리자)
// router.put('/admin/product/:productId', adminController.UpdateUser)
// //상품 삭제(관리자)
// router.post('/admin/product/:productId', adminController.###);
// //상품 등록(관리자)
// router.post('/admin/product', adminController.###);


module.exports = router;