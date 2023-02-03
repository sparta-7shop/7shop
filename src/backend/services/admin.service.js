const AdminRepository = require('../repositories/admin.repository');
const { Admin } = require('../db/index')

class AdminService {
    constructor(adminService) {
        this.adminService = adminService
    }
    adminRepository = new AdminRepository(Admin)

    deleteUser = async (userId) => {
        // delete 로직
        return await this.adminRepository.deleteUser(userId)
    }
}


module.exports = AdminService