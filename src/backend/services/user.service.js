const { Users, Carts } = require('../db')
const UserRepository = require('../repositories/user.repository')
const ProductRepository = require("../repositories/product.repository");

class UserService {
    constructor(userService) {
        this.userService = userService
    }
    userRepository = new UserRepository(Users)
    cartRepository = new UserRepository(Carts)
    getCartItem = async (userId) => {
        try {
            console.log(typeof userId)
            const getUserCart = await this.cartRepository.getCartItem(userId)
            //parseInt를 쓴 이유 : 값이 string으로 들어옴
            if (parseInt(userId) === undefined || null) {
                return {
                    errormessage: "해당하는 유저가 없습니다"
                }
            }
            return getUserCart
        } catch (error) {
            console.log(error)
        }

    }
    addCartItem = async (prodId, userId, count) => {
        try{
            const addUserCart = await this.cartRepository.addCartItem(prodId,userId,count)

            if(parseInt(prodId) === undefined || null) {
                return {
                    errormessage: "해당하는 제품이 없습니다."
                }
            }
            if(parseInt(count) <= 0) {
                return {
                    errormessage: "재고가 0인 상품은 카트에 담을 수 없습니다."
                }
            }
            if(parseInt(userId) === undefined || null) {
                return{
                    errormessage: "해당하는 유저가 없습니다."
                }
            }
            return addUserCart
        } catch (error) {
            console.log(error)
        }

    }
    updateCartItemQuantity = async (userId, prodId,count) => {
        try {
            if(parseInt(userId) === undefined || null) {
                return{
                    errormessage: "해당하는 유저가 없습니다."
                }
            }
            if(parseInt(prodId) === undefined || null) {
                return{
                    errormessage: "해당하는 상품이 없습니다."
                }
            }
            if(parseInt(count) <= 0) {
                return {
                    errormessage: "상품은 1개이상의 수량만 선택 가능합니다."
                }
            }
            return await this.cartRepository.updateCartItemQuantity(userId, prodId, count)
        } catch (error){
            console.log(error)
        }

        }

    deleteCartItem = async (userId,prodId) => {

        try {
            if(parseInt(userId) === undefined || null) {
                return{
                    errormessage: "해당하는 유저가 없어 삭제가 불가능합니다."
                }
            }
            if(parseInt(prodId) === undefined || null) {
                return{
                    errormessage: "해당하는 상품이 없어 삭제가 불가능합니다."
                }
            }
            return await this.cartRepository.deleteCartItem(userId, prodId)
        } catch (error){
            console.log(error)
        }

    }

}

module.exports = UserService