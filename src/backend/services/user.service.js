const { Address, Payments } = require('../db')
const UserRepository = require('../repositories/user.repository')
class UserService {
    constructor(userService) {
        this.userService = userService
    }
    addressRepository = new UserRepository(Address)
    paymentRepository = new UserRepository(Payments)

    postAddress = async (addressName, userId) => {
        return await this.addressRepository.postAddress(addressName, userId)
    }

    getAddress = async ({ userId }) => {
        const address = await this.addressRepository.getAddress({ userId })
        return address
    }

    payment = async ({ impUid, amount }) => {
        return await this.paymentRepository.payment({ impUid, amount })
    }

    updateStatus = async ({ impUid }) => {
        return await this.paymentRepository.cancelUpdate({ impUid })
    }

    cancelPayment = async ({ impUid }) => {
        return await this.paymentRepository.cancelPayment({ impUid })
    }

    checkAlreadyCancel = async ({ impUid }) => {
        const payment = await this.paymentRepository.checkAlreadyCancel({ impUid })
        if (payment) {
            return { errorMessage: "이미 취소된 결제입니다!" }
        }
    }

    checkDuplicate = async ({ impUid }) => {
        const payment = await this.paymentRepository.checkDuplicate({ impUid })
        if (payment) {
            return { errorMessage: "이미 결제된 내역이 있습니다" }
        }
    }
}

module.exports = UserService