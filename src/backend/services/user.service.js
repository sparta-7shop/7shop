const { Address } = require('../db')
const UserRepository = require('../repositories/user.repository')
class UserService {
    constructor(userService) {
        this.userService = userService
    }
    addressRepository = new UserRepository(Address)

    postAddress = async (addressName, userId) => {
        return await this.addressRepository.postAddress(addressName, userId)
    }
}

module.exports = UserService