const { Address, Payments } = require('../db')
const { sequelize } = require('../db/index')
const UserRepository = require('../repositories/user.repository')
class UserService {
    constructor(userService) {
        this.userService = userService
    }
    addressRepository = new UserRepository(Address)
    paymentRepository = new UserRepository(Payments)


    /* -------------주소-----------------------------*/
    postAddress = async (addressName, userId) => {
        try {
            return await this.addressRepository.postAddress(addressName, userId)
        } catch (error) {
            console.log(error);
        }
    }

    getAddress = async ({ userId }) => {
        try {
            const address = await this.addressRepository.getAddress({ userId })
            return address
        } catch (error) {
            console.log(error);
        }
    }

    /* -------------결제-----------------------------*/
    payment = async ({ impUid, amount }) => {
        try {
            return await this.paymentRepository.payment({ impUid, amount })
        } catch (error) {
            console.log(error);
        }
    }

    checkDuplicate = async ({ impUid }) => {
        try {
            const payment = await this.paymentRepository.checkDuplicate({ impUid })
            if (payment) {
                return { errorMessage: "이미 결제된 내역이 있습니다" }
            }
        } catch (error) {
            console.log(error);
        }
    }


    /* -------------결제취소-----------------------------*/
    checkAlreadyCancel = async ({ impUid }) => {
        try {
            const payment = await this.paymentRepository.checkAlreadyCancel({ impUid })
            if (payment) {
                return { errorMessage: "이미 취소된 결제입니다!" }
            }
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }


}

module.exports = UserService