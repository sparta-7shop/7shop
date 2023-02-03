const { Users, Carts } = require('../db')
const UserRepository = require('../repositories/user.repository')
const ProductRepository = require("../repositories/product.repository");

class UserService {
    constructor(userService) {
        this.userService = userService
    }
    userRepository = new UserRepository(Users)
    cartRepository = new UserRepository(Carts)

    /* ---------- getCartItem: Repository에서 userId를 매개로 해당 유저의 장바구니를 가져옵니다. ----------*/
    getCartItem = async (userId) => {
        try {
            return await this.cartRepository.getCartItem(userId)
        } catch (error) {
            console.log(error)
            return { errorMessage: error }
        }
    }
    /*----------   addCartItem: 장바구니에 물건을 추가합니다.   ----------*/
    addCartItem = async (prodId, userId, count) => {
        try{
            const addUserCart = await this.cartRepository.addCartItem(prodId,userId,count)
            // if(parseInt(prodId) === undefined || null) {
            //     return {
            //         errorMessage: "해당하는 제품이 없습니다."
            //     }
            // }
            // if(parseInt(count) <= 0) {
            //     return {
            //         errorMessage: "재고가 0인 상품은 카트에 담을 수 없습니다."
            //     }
            // }
            return addUserCart
        } catch (error) {
            console.log(error)
            return { errorMessage: error }
        }
    }

    /*----------  updateCartItemQuantity: 카트내의 한 품목의 수량을 업데이트합니다.  ----------*/
    updateCartItemQuantity = async (userId, prodId,count) => {
        try {
            if(parseInt(userId) === undefined || null) {
                return{
                    errorMessage: "해당하는 유저가 없습니다."
                }
            }
            if(parseInt(prodId) === undefined || null) {
                return{
                    errorMessage: "해당하는 상품이 없습니다."
                }
            }
            if(parseInt(count) <= 0) {
                return {
                    errorMessage: "상품은 1개이상의 수량만 선택 가능합니다."
                }
            }
            return await this.cartRepository.updateCartItemQuantity(userId, prodId, count)
        } catch (error){
            console.log(error)
            return { errorMessage: error }
        }
        }

    /*----------  deleteCartItem: 카트에서 상품을 하나 제거합니다.  ----------*/
    deleteCartItem = async (userId,prodId) => {
        try {
            if(parseInt(userId) === undefined || null) {
                return{
                    errorMessage: "해당하는 유저가 없어 삭제가 불가능합니다."
                }
            }
            if(parseInt(prodId) === undefined || null) {
                return{
                    code:409,
                    errorMessage: "해당하는 상품이 없어 삭제가 불가능합니다."
                }
            }
            return await this.cartRepository.deleteCartItem(userId, prodId)
        } catch (error){
            console.log(error)
            return { errorMessage: error }
        }
    }
}

module.exports = UserService