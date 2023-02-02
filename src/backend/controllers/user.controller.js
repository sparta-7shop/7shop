const { Users } = require('../db')
const UserService = require('../services/user.service')
class UserController {
    constructor(userController) {
        this.userController = userController
    }
    userService = new UserService(Users)
}

module.exports = UserController