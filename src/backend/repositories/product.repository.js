
//product Table
//productId, name, price, stock, img_path, description, category_id, admin_id

//cart Table
//cartId, product_id, user_id, count


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