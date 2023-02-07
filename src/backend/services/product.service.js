const ProductRepository = require('../repositories/product.repository')
const { Products, Carts, Orders, Users } = require('../db')
const UserRepository = require("../repositories/user.repository");

class ProductService {
    constructor(productService) {
        this.productService = productService
    }
    productRepository = new ProductRepository(Products)

    getProducts = async () => {
        try {
            return await this.productRepository.getProducts()
        } catch (error) {
            return { errorMessage: error }
        }
    }

    getProduct = async (productId) => {
        try {
            return await this.productRepository.getProduct(productId)
        } catch (error) {
            return { errorMessage: error }
        }
    }
}

module.exports = ProductService