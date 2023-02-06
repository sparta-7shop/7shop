const { Address, Payments, Users, Carts, Orders } = require('../db')
const IamportService = require('../services/iamport.service')
const { sequelize } = require('../db/index')

const UserService = require('../services/user.service')
const ProductService = require("../services/product.service");
const { userLoginValidation, signupValidation } = require('../validations');
require('dotenv').config({ path : "../../../.env" });



class UserController {
    constructor(userController) {
        this.userController = userController
    }
    userService = new UserService(Users)
    cartService = new UserService(Carts)
    addressService = new UserService(Address)
    paymentService = new UserService(Payments)
    iamportService = new IamportService()
    orderService = new UserService(Orders)

    postAddress = async (req, res) => {
        try {
            const { addressName } = req.body
            const userId = 1
            const address = await this.addressService.postAddress(addressName, userId)
            return res.json({ message: '주소 등록이 완료되었습니다!', address: address.name })
        } catch (error) {
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

    getAddress = async (req, res) => {
        const { userId } = req.params
        try {
            const address = await this.addressService.getAddress({ userId })
            if (address.errorMessage) { return res.json({ errorMessage: address.errorMessage }) }
            return res.json({ address })
        } catch (error) {
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

    order = async ({ req, res, paymentId, transaction }) => {
        try {
            const userId = 2

            const { count } = req.body
            const address = await this.addressService.getAddress({ userId })
            const addressName = address[0].addressName // 프론트에서 받아오는 address로 바꿔줘야함 -> body에 담아와야할듯

            await this.orderService.orderProduct({ count, addressName, userId, paymentId, transaction })
            return res.status(201).json({ message: '주문이 완료되었습니다.' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errorMessage: error })
        }
    }

    payment = async (req, res) => {
        const { impUid, amount } = req.body
        try {
            // 1. 아임포트에 요청해서 결제 완료 기록 존재하는지 확인
            const token = await this.iamportService.getToken()
            const isCheckPaid = await this.iamportService.checkPaid({ impUid, amount, token })
            if (isCheckPaid) { return res.status(500).json(isCheckPaid.errorMessage) }

            // 2,3번 트랜잭션
            const transaction = await sequelize.transaction()

            // 2. 아임포트 결제 + payment DB에 저장
            const payment = await this.paymentService.payment({ impUid, amount, transaction })
            const paymentId = payment.dataValues.id // payment 아이디

            // 3.order DB에 저장
            await this.order({ req, res, paymentId, transaction })

            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

    cancelPayment = async (req, res) => {
        const { impUid, count } = req.body
        try {
            //  1. 존재하는 건인지 확인
            const isExistPayment = await this.paymentService.checkDuplicate({ impUid })
            if (isExistPayment) { return res.status(isExistPayment.code).json({ errorMessage: isExistPayment.errorMessage }) }

            // 2. 이미 취소된 건인지 확인
            const isCancel = await this.paymentService.checkAlreadyCancel({ impUid })
            if (isCancel) { return res.status(isCancel.code).json({ errorMessage: isCancel.errorMessage }) }

            // 3. 아임포트에 취소 요청하기
            const token = await this.iamportService.getToken()
            const canceledAmount = await this.iamportService.cancel({
                impUid, token
            })

            // 3. 취소
            await this.paymentService.cancelPayment({ impUid, count })
            return res.json({ message: `${canceledAmount}원 취소 완료` })
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
            if (getUserCart.errorMessage) {
                return res.status(getUserCart.code).json({ errorMessage: getUserCart.errorMessage })
            }

            return res.status(200).json({ message: '카트를 성공적으로 불러왔습니다.', getUserCart })

        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ errorMessage: error })
        }
    }



    //현재 필요한 로직
    //카트내 고객이 원하는 물건의 수량이 products에 있는 재고보다 많을경우에 대한 예외처리
    //카트내 이미 물건이 있을경우 물건을 추가하는게 아닌 수량만 +1
    // --> product.repo에 접근?
    //
    //고민중..
    addCartItem = async (req, res) => {
        const { userId } = req.params;
        const { prodId, count } = req.body;

        try {
            const addUserCart = await this.cartService.addCartItem(prodId, userId, count);
            if (addUserCart?.errorMessage) {
                return res.status(addUserCart.code).json({ errorMessage: addUserCart.errorMessage })
            }
            return res.status(200).json({
                message: "카트에 물건을 성공적으로 담았습니다."
                , addUserCart
            })
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }
    updateCartItemQuantity = async (req, res) => {
        try {
            const { userId, prodId } = req.params;
            const { count } = req.body;
            const updateItemQuantity = await this.cartService.updateCartItemQuantity(userId, prodId, count)
            if (updateItemQuantity?.errorMessage) {
                return res.status(updateItemQuantity.code).json({ errorMessage: updateItemQuantity.errorMessage })
            }
            return res.status(200).json({ message: "수량이 정상적으로 수정되었습니다." })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

    deleteCartItem = async (req, res) => {
        try {
            const { userId } = req.params;
            const { prodId } = req.body;
            const deleteUserCart = await this.cartService.deleteCartItem(userId, prodId);
            if (deleteUserCart.errorMessage) {
                return res.status(deleteUserCart.code).json({ errorMessage: deleteUserCart.errorMessage })
            }
            return res.status(201).json({ message: "상품을 성공적으로 삭제했습니다.", deleteUserCart })
        } catch (error) {
            return res.status(500).json({ errorMessage: error.errorMessage })
        }
    }

  // 회원가입
  userSignup = async ( req, res ) => {
    try {
      console.log("바디",req.body)
      const loginInfo = await signupValidation.validateAsync(req.body);
      console.log(loginInfo)

      await this.userService.userSignup(loginInfo);

      return res.status(200).json({ message : "가입완료" });

    } catch ( err ) {
      if ( err.isJoi ) {
        return res.status(422).json({ messge : err.details[0].message });
      }
      res.status(500).json({ message : err.message });
    }

  };

  // 메일 보내기
  sendMail = async ( req, res ) => {
    const { name, email } = req.body; // 보낼 이메일 주소, 이메일 제목, 이메일 본문, 받는 사람 이름

    await this.userService.sendMail(name, email);
    return res.status(200).json({ message : "전송 성공" });
  };

  // 로그인
  userLogin = async ( req, res, next ) => {
    console.log(req.body)
    const loginInfo = await userLoginValidation.validateAsync(req.body);

    const { code, message, accessToken } = await this.userService.userLogin(loginInfo);

    res.cookie('accessToken', accessToken);
    return res.status(code).json({ message : message, accessToken : accessToken || undefined });
  };

  // 로그아웃
  userLogout = ( req, res, next ) => {
    res.clearCookie('accessToken');
    return res.status(200).json({ message : '로그아웃 성공' });
  };

  // 마이페이지
  userMypage = async (req,res) => {
    await this.userService.myPage()
  }

}

module.exports = UserController;