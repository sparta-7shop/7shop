const { Users, Carts } = require('../db')
const UserService = require('../services/user.service')
const ProductService = require("../services/product.service");


class UserController {
    constructor(userController) {
        this.userController = userController
    }
    userService = new UserService(Users)
    cartService = new UserService(Carts)
    //현재 카트 # 현재는 # req.params로 받아옴, 하지만 후에 로그인이 구현되면
    // 토큰값 전달 -> 복호화 -> 전역변수 userId를 불러와 userId를 처리해야함.
    getCartItem = async (req, res) => {
        const { userId } = req.params;
        const getUserCart = await this.cartService.getCartItem(userId);
        if (getUserCart === null || undefined) {
            return res.json({ message: '유저를 찾을수 없습니다.'})
        }
        return res.json({ message: '카트를 성공적으로 불러왔습니다.', getUserCart})

    }
    addCartItem = async (req, res) => {
        const { userId } = req.params;
        const { prodId, count } = req.body;
        console.log("USERID",userId)
        console.log("COUNT",count);
        console.log("PRODID",prodId);
        const addUserCart = await this.cartService.addCartItem(prodId, userId, count);
        if (!prodId) {
            return res.status(412).json({
                errormessage: "추가하려는 상품의 아이디가 올바르지 않습니다."
            })
        }

        if(userId === undefined){
            return res.status(412).json({
                errormessage : "유저를 찾을 수 없습니다."
            })
        }
        if(prodId === undefined){
            return res.status(412).json({
                errormessage : "상품을 찾을 수 없습니다."
            })
        }
        if(count <= 0) {
            return res.status(412).json({
                errormessage : "선택하신 제품 재고가 없어 카트에 담을 수 없습니다."
            })
        }
        return res.status(200).json({
            message: "카트에 물건을 성공적으로 담았습니다."
            , addUserCart
        })
    }
    updateCartItemQuantity = async (req, res) => {
        const { userId, prodId } = req.params;
        const { count } = req.body;
        const updateItemQuantity = await this.cartService.updateCartItemQuantity(userId,prodId,count)

        if (count <= 0) {
            return res.status(412).json({
                errormessage : "수량은 1부터 입력가능합니다."
            })
        }
        return res.status(200).json({ message: "수량이 정상적으로 수정되었습니다.", updateItemQuantity})
    }

    deleteCartItem = async (req, res) => {
        const {userId, prodId} = req.params;
        const deleteUserCart = await this.cartService.deleteCartItem(userId,prodId);
        if(prodId === undefined){
            return res.status(412).json({
                errormessage : "상품을 찾을 수 없습니다."
            })
        }
        if(userId === undefined){
            return res.status(412).json({
                errormessage : "유저를 찾을 수 없습니다."
            })
        }
        return res.status(200).json({ message: "상품을 성공적으로 삭제했습니다.", deleteUserCart})
    }

}

module.exports = UserController