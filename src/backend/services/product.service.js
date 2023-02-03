const ProductRepository = require('../repositories/product.repository')
const { Products, Carts, Orders, Users } = require('../db')
const UserRepository = require("../repositories/user.repository");
const {del} = require("express/lib/application");
class ProductService {
    constructor(productService) {
        this.productService = productService
    }
    productRepository = new ProductRepository(Products)

    getProducts = async () => {
        const products = await this.productRepository.getProducts()
        return products
    }

}

module.exports = ProductService