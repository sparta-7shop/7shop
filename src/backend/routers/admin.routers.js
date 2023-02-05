const express = require("express");

const AdminController = require('../controllers/admin.controller');
const multerUpload = require('../middlewares/multer')
const { Admin } = require('../db/index')
const adminController = new AdminController(Admin)


const router = express.Router();

//회원 삭제(관리자)
router.post("/admin/users/:userId", adminController.deleteUser);
//상품 수정(관리자)
router.put("/admin/product/:productId", multerUpload, adminController.updateProduct);
//상품 삭제(관리자)
router.post("/admin/product/:productId", adminController.deleteProduct);
//상품 등록(관리자)
router.post('/admin/product', multerUpload, adminController.createProduct)


module.exports = router;
