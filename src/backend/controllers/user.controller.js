const { Address, Payments, Users, Carts } = require('../db')
const IamportService = require('../services/iamport.service')


const UserService = require('../services/user.service')
const ProductService = require("../services/product.service");


class UserController {
    constructor(userController) {
        this.userController = userController
    }
    userService = new UserService(Users)
    cartService = new UserService(Carts)
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

    //현재 카트 # 현재는 # req.params로 받아옴, 하지만 후에 로그인이 구현되면
    // 토큰값 전달 -> 복호화 -> 전역변수 userId를 불러와 userId를 처리해야함.
    //authmiddleware 에서 걸러지는것들은 다 예외처리 할 필요가 없음.
    getCartItem = async (req, res) => {
        const { userId } = req.params;
        try {
            const getUserCart = await this.cartService.getCartItem(userId);
            console.log(typeof getUserCart)
            console.log("겟카트1",getUserCart[0].id)
            if (getUserCart === null) {
                return res.status(500).json({errorMessage: "유저를 찾을수 없습니다."})
            }
            console.log("카트 불러와써염",getUserCart)
            return res.json({ message: '카트를 성공적으로 불러왔습니다.', getUserCart})

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

    //현재 필요한 로직
    //카트내 고객이 원하는 물건의 수량이 products에 있는 재고보다 많을경우에 대한 예외처리
    //카트내 이미 물건이 있을경우 물건을 추가하는게 아닌 수량만 +1\
    // --> product.repo에 접근?
    //고민중..
    addCartItem = async (req, res) => {
        const { userId } = req.params;
        const { prodId, count } = req.body;

        if (!prodId) {
            return res.status(412).json({errorMessage: "추가하려는 상품이 올바르지 않습니다."})
        }
        if(userId === undefined){
            return res.status(412).json({errorMessage : "유저를 찾을 수 없습니다."})
        }
        if(count <= 0) {
            return res.status(412).json({errorMessage : "수량은 1보다 작을수 없습니다."})
        }
        try{
            const addUserCart = await this.cartService.addCartItem(prodId, userId, count);
            if(addUserCart === null) {
                return res.status(500).json({errorMessage: "유저를 찾을수 없습니다."})
            }
            return res.status(200).json({
                message: "카트에 물건을 성공적으로 담았습니다."
                , addUserCart
            })
        }
        catch (error){
            console.log(error)
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }
    updateCartItemQuantity = async (req, res) => {
        try {
            const {userId, prodId} = req.params;
            const {count} = req.body;
            const updateItemQuantity = await this.cartService.updateCartItemQuantity(userId, prodId, count)
            if (count <= 0) {
                return res.status(412).json({errorMessage: "수량은 1부터 입력가능합니다."})
            }
            return res.status(200).json({message: "수량이 정상적으로 수정되었습니다.", updateItemQuantity})
        } catch (error) {
            console.log(error)
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

    deleteCartItem = async (req, res) => {
        try{
            const {userId} = req.params;
            const {prodId} = req.body;
            const deleteUserCart = await this.cartService.deleteCartItem(userId,prodId);
            console.log("유저 삭제",deleteUserCart);
            if(!deleteUserCart) {
                return res.status(500).json({errorMessage: "해당하는 상품 또는 유저를 찾을 수 없습니다."})
            }
            return res.status(200).json({ message: "상품을 성공적으로 삭제했습니다.", deleteUserCart})
        }catch (error){
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }
}

module.exports = UserController
