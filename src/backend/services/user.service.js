const { Users, Carts } = require('../db')
const UserRepository = require('../repositories/user.repository')

class UserService {
    constructor(userService) {
        this.userService = userService
    }
    userRepository = new UserRepository(Users)
    cartRepository = new UserRepository(Carts)
    getCart = async (userId) => {
        const getUserCart = await this.cartRepository.getCart(userId)
        return getUserCart
    }
}

module.exports = UserService