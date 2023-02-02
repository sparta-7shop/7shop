const { Users, Carts } = require('../db')
const UserService = require('../services/user.service')


class UserController {
    constructor(userController) {
        this.userController = userController
    }
    userService = new UserService(Users)
    cartService = new UserService(Carts)

    //현재 카트 # 현재는 # req.params로 받아옴, 하지만 후에 로그인이 구현되면
    // 토큰값 전달 -> 복호화 -> 전역변수 userId를 불러와 userId를 처리해야함.
    getCart = async (req, res) => {
        console.log("나는야 카트",new UserService(Carts))
        const { userId } = req.params
        const getUserCart = await this.cartService.getCart(userId)
        return res.json({ 'message': '카트를 불러왔습니다.', getUserCart})
    }


}

module.exports = UserController