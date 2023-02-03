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
            return res.json({ errorMessage: error })
        }
    }

    getAddress = async (req, res, next) => {
        const { userId } = req.params
        try {
            const address = await this.addressService.getAddress({ userId })
            return res.json({ address })
        } catch (error) {
            return res.json({ errorMessage: error })
        }
    }

    payment = async (req, res, _next) => {
        const { impUid, amount } = req.body
        // 1. 아임포트에 요청해서 결제 완료 기록 존재하는지 확인
        const token = await this.iamportService.getToken()
        const isCheckPaid = await this.iamportService.checkPaid({ impUid, amount, token })
        if (isCheckPaid) { return res.json(isCheckPaid) }

        // 2. 중복 결제 체크
        const isDuplicated = await this.paymentService.checkDuplicate({ impUid })
        if (isDuplicated) { return res.json(isDuplicated) }

        // 3. 결제
        await this.paymentService.payment({ impUid, amount })
        return res.json({ message: "결제 성공" })
    }

    cancelPayment = async (req, res, next) => {
        const { impUid } = req.body
        // 1. 이미 취소된 건인지 확인
        const isCancel = await this.paymentService.checkAlreadyCancel({ impUid })
        if (isCancel) { return res.json(isCancel) }

        // 2. 아임포트에 취소 요청하기
        const token = await this.iamportService.getToken()
        const canceledAmount = await this.iamportService.cancel({
            impUid, token
        })

        // 3. 취소 전 status 업데이트
        await this.paymentService.updateStatus({ impUid })

        // 3. 취소
        try {
            await this.paymentService.cancelPayment({
                impUid,
            })
            return res.json({ message: `${canceledAmount}원 취소 완료` })
        } catch (error) {
            return res.json(500).json({ errorMessage: error.message })
        }
    }
}

module.exports = UserController
