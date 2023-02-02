const AdminService = require('../services/admin.service')
const adminModel = require('../db/admin.model')

class AdminController {
    constructor(adminController) {
        this.adminController = adminController
    }
    adminService = new AdminService(adminModel)

    deleteUser = async (req, res) => {
        const { userId } = req.params;
        console.log('userId', userId)

        const a = await this.adminService.deleteUser(userId)
        return res.json({ 'msg': '삭제완료', a })
    }

    UpdateUser() {
        //
    }
}

module.exports = AdminController