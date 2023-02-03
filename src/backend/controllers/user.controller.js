const { Address, Payments } = require('../db')
const IamportService = require('../services/iamport.service')
const UserService = require('../services/user.service')
class UserController {
    constructor(userController) {
        this.userController = userController
    }
    addressService = new UserService(Address)
    paymentService = new UserService(Payments)
    iamportService = new IamportService()

    postAddress = async (req, res, next) => {
        try {
            const { addressName } = req.body
            const userId = 1
            const address = await this.addressService.postAddress(addressName, userId)
            return res.json({ message: '주소 등록이 완료되었습니다!', address: address.name })
        } catch (error) {
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

    getAddress = async (req, res, next) => {
        const { userId } = req.params
        try {
            const address = await this.addressService.getAddress({ userId })
            return res.json({ address })
        } catch (error) {
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

    payment = async (req, res, _next) => {
        const { impUid, amount } = req.body
        try {
            // 1. 아임포트에 요청해서 결제 완료 기록 존재하는지 확인
            const token = await this.iamportService.getToken()
            const isCheckPaid = await this.iamportService.checkPaid({ impUid, amount, token })
            if (isCheckPaid) { return res.status(500).json(isCheckPaid.errorMessage) }

            // 2. 중복 결제 체크
            const isDuplicated = await this.paymentService.checkDuplicate({ impUid })
            if (isDuplicated) { return res.status(isDuplicated.code).json(isDuplicated.errorMessage) }

            // 3. 결제
            await this.paymentService.payment({ impUid, amount })
            return res.status(201).json({ message: "결제 성공" })
        } catch (error) {
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

    cancelPayment = async (req, res, next) => {
        const { impUid } = req.body
        try {
            //  1. 존재하는 건인지 확인
            const isExistPayment = await this.paymentService.checkDuplicate({ impUid })
            if (isExistPayment) { return res.status(isExistPayment.code).json({ errorMessage: isExistPayment.errorMessage }) }

            // 2. 이미 취소된 건인지 확인
            const isCancel = await this.paymentService.checkAlreadyCancel({ impUid })
            if (isCancel) { return res.json(isCancel) }

            // 3. 아임포트에 취소 요청하기
            const token = await this.iamportService.getToken()
            const canceledAmount = await this.iamportService.cancel({
                impUid, token
            })

            // 3. 취소
            await this.paymentService.cancelPayment({
                impUid,
            })
            return res.json({ message: `${canceledAmount}원 취소 완료` })
        } catch (error) {
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }
}

module.exports = UserController
