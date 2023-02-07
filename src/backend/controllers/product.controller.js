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

    getProductsByCategory1 = async (req, res) => {
        try {
            const productList = await this.productService.getProductsByCategory1();
            return res.json({ productList })
        } catch (error) {
            return res.json({ errorMessage: error })
        }
    }
    getProductsByCategory2 = async (req, res) => {
        try {
            const productList = await this.productService.getProductsByCategory2();
            return res.json({ productList })
        } catch (error) {
            return res.json({ errorMessage: error })
        }
    }

}

module.exports = ProductController