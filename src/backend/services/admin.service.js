const AdminRepository = require('../repositories/admin.repository');
const { Admin, Products } = require('../db/index')

class AdminService {
    constructor(adminService) {
        this.adminService = adminService
    }
    adminRepository = new AdminRepository(Admin)
    productRepository = new AdminRepository(Products)

    deleteUser = async (userId) => {
        // delete 로직
        return await this.adminRepository.deleteUser(userId)
    }

    createProduct = async ({ name, price, stock, description, productImage, adminId, categoryId }) => {
        try {
            const product = await this.productRepository.createProduct({ name, price, stock, description, productImage, adminId, categoryId })
            return product
        } catch (error) {
            return { errorMessage: error }
        }
    }
}


module.exports = AdminService