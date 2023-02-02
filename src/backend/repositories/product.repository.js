class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel
    }
    getProducts = async () => {
        const products = await this.productModel.findAll()
        return products
    }
}

module.exports = ProductRepository