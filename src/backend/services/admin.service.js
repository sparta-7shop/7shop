const AdminRepository = require('../repositories/admin.repository');
const { Admin } = require('../db/index')

class AdminService {
    constructor(adminService) {
        this.adminService = adminService
    }
    adminRepository = new AdminRepository(Admin)

    deleteUser = async (userId) => {

        const deleteUser = await this.adminRepository.deleteUser()
        return deleteUser
    }
}


module.exports = AdminService