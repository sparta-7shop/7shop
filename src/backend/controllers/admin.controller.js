const AdminService = require('../services/admin.service')
const { Admin } = require('../db/index')

class AdminController {
    constructor(adminController) {
        this.adminController = adminController
    }
    adminService = new AdminService(Admin)

    deleteUser = async (req, res) => {
        const { userId } = req.params;
        console.log('userId', userId)

        const a = await this.adminService.deleteUser(userId)
        console.log('a', a)
        return res.json({ 'msg': '삭제완료', a })
    }

    UpdateUser() {
        //
    }
}

module.exports = AdminController