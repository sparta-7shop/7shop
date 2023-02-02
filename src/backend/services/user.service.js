const { Address } = require('../db')
const UserRepository = require('../repositories/user.repository')
class UserService {
    constructor(userService) {
        this.userService = userService
    }
    addressRepository = new UserRepository(Address)

    postAddress = async (addressName) => {
        return await this.addressRepository.postAddress(addressName)
    }
}

module.exports = UserService