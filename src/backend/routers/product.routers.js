const express = require('express');

const ProductController = require('../controllers/product.controller');
const { Products } = require('../db')
const productController = new ProductController(Products)


const router = express.Router();

// 상품 목록 불러오기
router.get('/products/list', productController.getProducts)



module.exports = router;