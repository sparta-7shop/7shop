class AdminRepository {
    constructor(adminModel) {
        this.adminModel = adminModel
    }
    deleteUser = async (userId) => {
        try {
            const deleteUser = await this.adminModel.findAll({ where: { id: userId } })
            console.log('deleteUser', deleteUser)
            return deleteUser
        } catch (error) {
            console.log(error)
        }
    }

    createProduct = async ({ name, price, stock, description, productImage, adminId, categoryId }) => {
        try {
            const product = await this.adminModel.create(
                { name, price, stock, description, img_path: productImage, admin_id: adminId, category_Id: categoryId })
            return product
        } catch (error) {
            return { errorMessage: error }
        }
    }
}
module.exports = AdminRepository