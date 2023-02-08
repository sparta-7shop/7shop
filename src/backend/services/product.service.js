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
            const productInfo = await this.productRepository.getProducts()

            const product = productInfo.map(info => {
                return {
                    id: info.id,
                    name: info.name,
                    price: info.price,
                    stock: info.stock,
                    description: info.description,
                    img_path: info.img_path,
                    createdAt: info.createdAt.toLocaleString()
                }
            })
            return product

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

    getProductsByCategory1 = async () => {
        try {
            return await this.productRepository.getProductsByCategory1()
        } catch (error) {
            return { errorMessage: error }
        }
    }
    getProductsByCategory2 = async () => {
        try {
            return await this.productRepository.getProductsByCategory2()
        } catch (error) {
            return { errorMessage: error }
        }
    }
}

module.exports = ProductService