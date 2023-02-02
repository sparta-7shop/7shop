const AdminRepository = require('../repositories/admin.repository');
const adminModel = require('../db/admin.model')

class AdminService {
    constructor(adminService) {
        this.adminService = adminService
    }
    adminRepository = new AdminRepository(adminModel)

    deleteUser = async (userId) => {
        // delete 로직
        const deleteUser = await this.adminRepository.deleteUser(userId)
        return deleteUser
    }
}


module.exports = AdminService