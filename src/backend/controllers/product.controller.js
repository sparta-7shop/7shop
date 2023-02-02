const ProductService = require('../services/product.service')
const { Products } = require('../db')
class ProductController {
    constructor(productController) {
        this.productController = productController
    }
    productService = new ProductService(Products)

    getProducts = async (req, res) => {
        const productList = await this.productService.getProducts()
        return res.json({ productList })
    }
}

module.exports = ProductController