const adminModel = require('../db/admin.model.js')

class AdminRepository {
    // constructor(adminModel) {
    //     this.adminModel = adminModel
    // }
    // adminModel = new AdminRepository(adminModel)

    deleteUser = async (userId) => {
        const deleteUser = await adminModel.findByPk(userId)
        console.log('deleteUser', deleteUser)
        return deleteUser
    }
}
module.exports = AdminRepository