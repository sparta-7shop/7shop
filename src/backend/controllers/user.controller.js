const { Address } = require('../db')
const UserService = require('../services/user.service')
class UserController {
    constructor(userController) {
        this.userController = userController
    }
    postService = new UserService(Address)

    postAddress = async (req, res, next) => {
        try {
            const { addressName } = req.body
            const userId = 1
            const address = await this.postService.postAddress(addressName, userId)
            return res.json({ message: '주소 등록이 완료되었습니다!', address: address.name })
        } catch (error) {
            return res.json({ errorMessage: error })
        }
    }
}

module.exports = UserController
