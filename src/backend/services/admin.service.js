const AdminRepository = require('../repositories/admin.repository');
const { Admin } = require('../db/index')

class AdminService {
    constructor(adminService) {
        this.adminService = adminService
    }
    adminRepository = new AdminRepository(Admin)

    deleteUser = async (userId) => {
        // delete 로직
        const deleteUser = await this.adminRepository.deleteUser(userId)
        return deleteUser
    }
}


module.exports = AdminService