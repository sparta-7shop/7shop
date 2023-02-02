const ProductRepository = require('../repositories/product.repository')
const { Products } = require('../db')
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