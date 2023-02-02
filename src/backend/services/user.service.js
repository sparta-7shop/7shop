const { Users } = require('../db')
const UserRepository = require('../repositories/user.repository')
class UserService {
    constructor(userService) {
        this.userService = userService
    }
    userRepository = new UserRepository(Users)
}

module.exports = UserService