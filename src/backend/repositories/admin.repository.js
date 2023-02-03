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
}
module.exports = AdminRepository