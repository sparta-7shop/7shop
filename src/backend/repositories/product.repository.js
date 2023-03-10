
//product Table
//productId, name, price, stock, img_path, description, category_id, admin_id
const { Carts } = require('../db')
const { Sequelize } = require('sequelize');

//cart Table
//cartId, product_id, user_id, count


class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel
    }
    getProducts = async () => {
        try {
            const products = await this.productModel.findAll()
            return products
        } catch (error) {
            console.log(error);
        }
    }

    getProduct = async (productId) => {
        try {
            const products = await this.productModel.findOne({
                where: { id: productId }
            })
            return products
        } catch (error) {
            console.log(error);
        }
    }
    getProductsByCategory1 = async () => {
        try {
            const products = await this.productModel.findAll({
                where: { category_Id: 1 }
            })
            return products
        } catch (error) {
            console.log(error);
        }
    }
    getProductsByCategory2 = async () => {
        try {
            const products = await this.productModel.findAll({
                where: { category_Id: 2 }
            })
            return products
        } catch (error) {
            console.log(error);
        }
    }

    decrementStock = async ({ count, transaction }) => {
        try {
            await this.productModel.update(
                { stock: Sequelize.literal(`stock-${2}`) }, // body안에 count받아와야함(현재는 하드코딩)
                { where: { id: [17] } }, // product ID 어디서 받아오지?
                { transaction }
            )
        } catch (error) {
            return { errorMessage: error }
            console.log(error);
        }
    }
    IncrementtStock = async ({ count, transaction }) => {
        try {
            await this.productModel.update(
                { stock: Sequelize.literal(`stock+${count}`) }, // body안에 count받아와야함(현재는 하드코딩)
                { where: { id: 3 } }, // product ID는 어디서 받아올지?
                { transaction }
            )
        } catch (error) {
            return { errorMessage: error }
            console.log(error);
        }
    }
}

module.exports = ProductRepository