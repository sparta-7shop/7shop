const ProductService = require('../services/product.service')
const { Products, Carts } = require('../db')
const UserService = require("../services/user.service");

class ProductController {
    constructor(productController) {
        this.productController = productController
    }
    productService = new ProductService(Products)

    getProducts = async (req, res) => {
        try {
            const productList = await this.productService.getProducts();
            return res.json({ productList })
        } catch (error) {
            return res.json({ errorMessage: error })
        }
    }

    getProduct = async (req, res) => {
        const { productId } = req.params
        try {
            const product = await this.productService.getProduct(productId)
            return res.json({ product })

        } catch (error) {

        }
    }
}

module.exports = ProductController