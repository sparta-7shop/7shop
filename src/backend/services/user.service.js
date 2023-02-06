
const { Address, Payments, Users, Carts, Orders } = require('../db')
const { sequelize } = require('../db/index')

const UserRepository = require('../repositories/user.repository')
const ProductRepository = require("../repositories/product.repository");

class UserService {
    constructor(userService) {
        this.userService = userService
    }

    addressRepository = new UserRepository(Address)
    paymentRepository = new UserRepository(Payments)
    orderRepository = new UserRepository(Orders)
    cartRepository = new UserRepository(Carts)

    /* -------------주소-----------------------------*/
    postAddress = async (addressName, userId) => {
        try {
            return await this.addressRepository.postAddress(addressName, userId)
        } catch (error) {
            return { errorMessage: error }
        }
    }

    getAddress = async ({ userId }) => {
        try {
            const Alladdress = await this.addressRepository.getAddress({ userId })
            if (Alladdress.length < 1) { return { errorMessage: '주소가 존재하지 않습니다' } }
            const addressName = Alladdress.map((address) => {
                return { addressName: address.name }
            })
            return addressName
        } catch (error) {
            return { errorMessage: error }
        }
    }

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
        try {
            const addUserCart = await this.cartRepository.addCartItem(prodId, userId, count)
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

    /* -------------결제-----------------------------*/
    orderProduct = async ({ addressName, userId, paymentId, transaction }) => {
        try {
            return await this.orderRepository.orderProduct({ addressName, userId, paymentId, transaction })
        } catch (error) {
            console.log(error)
            return { errorMessage: error }
        }
    }

    payment = async ({ impUid, amount, transaction }) => {
        try {
            return await this.paymentRepository.payment({ impUid, amount, transaction })
        } catch (error) {
            return { errorMessage: error }
        }
    }

    checkDuplicate = async ({ impUid }) => {
        try {
            const payment = await this.paymentRepository.checkDuplicate({ impUid })
            // if (payment) {
            //     return { code: 409, errorMessage: "이미 결제된 내역이 있습니다" }
            // }
            if (!payment) {
                return { code: 409, errorMessage: "존재하지 않는 결제입니다." }
            }
        } catch (error) {
            return { errorMessage: error }
        }
    }


    /* -------------결제취소-----------------------------*/
    checkAlreadyCancel = async ({ impUid }) => {
        try {
            const payment = await this.paymentRepository.checkAlreadyCancel({ impUid })
            if (payment) {
                return { code: 409, errorMessage: "이미 취소된 결제입니다!" }
            }
        } catch (error) {
            return { errorMessage: error }
        }
    }
    cancelPayment = async ({ impUid }) => {
        const transaction = await sequelize.transaction()
        try {
            await this.paymentRepository.cancelUpdate({ transaction, impUid })

            await this.paymentRepository.cancelPayment({ transaction, impUid })

            await transaction.commit()

            return { message: '취소 성공' }

        } catch (error) {
            await transaction.rollback()
            return { errorMessage: error }
        }
    }


    /*----------  updateCartItemQuantity: 카트내의 한 품목의 수량을 업데이트합니다.  ----------*/
    updateCartItemQuantity = async (userId, prodId, count) => {
        try {
            if (parseInt(userId) === undefined || null) {
                return {
                    errorMessage: "해당하는 유저가 없습니다."
                }
            }
            if (parseInt(prodId) === undefined || null) {
                return {
                    errorMessage: "해당하는 상품이 없습니다."
                }
            }
            if (parseInt(count) <= 0) {
                return {
                    errorMessage: "상품은 1개이상의 수량만 선택 가능합니다."
                }
            }
            return await this.cartRepository.updateCartItemQuantity(userId, prodId, count)
        } catch (error) {
            console.log(error)
            return { errorMessage: error }
        }
    }

    /*----------  deleteCartItem: 카트에서 상품을 하나 제거합니다.  ----------*/
    deleteCartItem = async (userId, prodId) => {
        try {
            if (parseInt(userId) === undefined || null) {
                return {
                    errorMessage: "해당하는 유저가 없어 삭제가 불가능합니다."
                }
            }
            if (parseInt(prodId) === undefined || null) {
                return {
                    code: 409,
                    errorMessage: "해당하는 상품이 없어 삭제가 불가능합니다."
                }
            }
            return await this.cartRepository.deleteCartItem(userId, prodId)
        } catch (error) {
            console.log(error)
            return { errorMessage: error }
        }
    }
}

module.exports = UserService