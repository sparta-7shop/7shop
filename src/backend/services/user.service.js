const { Address, Payments, Users, Carts, Orders, Products } = require('../db')
const { sequelize } = require('../db/index')

const UserRepository = require('../repositories/user.repository')

const ProductRepository = require("../repositories/product.repository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const storage = require('../validations/joi_storage');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: "../../../.env" });
const env = process.env;


class UserService {
    constructor(userService) {
        this.userService = userService
    }

    addressRepository = new UserRepository(Address)
    paymentRepository = new UserRepository(Payments)
    orderRepository = new UserRepository(Orders)
    cartRepository = new UserRepository(Carts)
    userRepository = new UserRepository(Users)
    productRepository = new ProductRepository(Products)

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
            const getUserCart = await this.cartRepository.getCartItem(userId)
            if (getUserCart.length < 1) {
                return { code: 412, errorMessage: "카트에 담긴 상품이 없습니다." }
            }
            return getUserCart
        } catch (error) {
            console.log(error)
            return { errorMessage: error }
        }
    }
    /*----------   addCartItem: 장바구니에 물건을 추가합니다.   ----------*/
    addCartItem = async (prodId, userId, count) => {
        try {
            const user = await this.userRepository.getUser(userId)
            if (!user) {
                return { code: 412, errorMessage: "유저를 찾을 수 없습니다." }
            }
            const product = await this.productRepository.getProduct(prodId)
            const stock = product.dataValues.stock
            if (count <= 0) {
                return { code: 412, errorMessage: "수량은 1보다 작을수 없습니다." }
            }
            if (count > stock) {
                return { code: 412, errorMessage: `상품의 수량이 부족합니다 (남은수량:${stock}개)` }
            }
            const addUserCart = await this.cartRepository.addCartItem(prodId, userId, count)
            return addUserCart
        } catch (error) {
            console.log(error)
            return { errorMessage: error }
        }
    }
    /*----------  updateCartItemQuantity: 카트내의 한 품목의 수량을 업데이트합니다.  ----------*/
    updateCartItemQuantity = async (userId, prodId, count) => {
        try {
            const product = await this.productRepository.getProduct(prodId)
            if (!product) {
                return { code: 412, errorMessage: "해당 제품이 존재하지 않습니다." }
            }
            const stock = product.dataValues.stock
            if (count <= 0) {
                return { code: 412, errorMessage: "수량은 1보다 작을수 없습니다." }
            }
            if (count > stock) {
                return { code: 412, errorMessage: `상품의 수량이 부족합니다 (남은수량:${stock}개)` }
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
            const product = await this.productRepository.getProduct(prodId)
            if (!product) {
                return { code: 412, errorMessage: "해당 제품이 존재하지 않습니다." }
            }
            return await this.cartRepository.deleteCartItem(userId, prodId)
        } catch (error) {
            console.log(error)
            return { errorMessage: error }
        }
    }

    // 회원가입
    userSignup = async (loginInfo) => {
        const hashedPassword = await bcrypt.hash(loginInfo.password, 12);
        loginInfo.password = hashedPassword;

        const userSignup = await this.userRepository.userSignup(loginInfo);
    };

    // // 인증메일
    sendMail = async (name, email) => {
        try {
            console.log("호롤ㅇㄴ몰ㅇㄴㄻㅇ너롬ㅇㄶㅁㅇㄶ", name, email)
            // 전송하기
            console.log(env.MAIL, env.MAILPASSWORD)
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: env.MAIL,
                    pass: env.MAILPASSWORD,
                },
                //변경부분 시작
                tls: {
                    rejectUnauthorized: false,
                },
                //변경부분 끝
            });

            // 보낼 메세지
            let message = {
                from: env.MAIL, // 보내는 사람
                to: `${name}<${email}>`, // 받는 사람 이름과 이메일 주소
                subject: '회원가입 메일 테스트', // 메일 제목html
                html: `<div
      style='
      text-align: center;
      width: 50%;
      height: 60%;
      margin: 15%;
      padding: 20px;
      box-shadow: 1px 1px 3px 0px #999;
      '>
      <h2>${name} 님, 안녕하세요.</h2> <br/>
      <h2>제목: 회원가입 메일 테스트</h2> <br/>
      회원가입 메일 테스트<br/>
      인증번호 : ${storage.getSignupEmailConfirm()}<br/><br/><br/>
      </div>`,
            };


            // 메일이 보내진 후의 콜백 함수
            await transporter.sendMail(message, (err) => {
                if (err) {
                    console.error(err);
                    return { code: 400, message: "if err 절 입니다." };
                } else
                    return { code: 200, message: '메일전송 완료' };

            });
        } catch (err) {
        }
    };

    // 로그인
    userLogin = async (loginInfo) => {
        try {
            const user = await this.userRepository.findUser(loginInfo);

            if (!user) {
                return { code: 400, message: "가입되지않은 회원 입니다." };
            }
            // console.log("로그인정보오오오오오오오오", loginInfo)
            const comparePassword = await bcrypt.compare(loginInfo.password, user.password);

            if (!comparePassword) {
                return { code: 400, message: "비밀번호가 일치하지않습니다." };
            }

            const accessToken = jwt.sign(
                { id: user.id, name: user.name },
                process.env.COOKIE_SECRET,
                { expiresIn: '1d' }
            );

            return { code: 200, message: '로그인 완료', accessToken };

        } catch (err) {
            console.log(err)
            return { code: 500, message: "예상치못한 오류 입니다." };

        }
    };

    // 마이페이지
    userMypage = async () => {
        const userSignup = await this.userRepository.userMypage();

    }


    /* -------------결제-----------------------------*/
    orderProduct = async ({ count, addressName, userId, paymentId, transaction }) => {
        try {
            // product 재고 업데이트
            await this.productRepository.decrementStock({ count, transaction })
            // 카트 상태 업데이트
            await this.cartRepository.updateCartStatus({ userId })
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
            if (!payment) {
                return { code: 409, errorMessage: "이미 취소된 결제입니다!" }
            }
        } catch (error) {
            return { errorMessage: error }
        }
    }
    cancelPayment = async ({ impUid, count }) => {
        const transaction = await sequelize.transaction()
        try {
            await this.productRepository.IncrementtStock({ transaction, count })

            await this.paymentRepository.cancelPayment({ transaction, impUid })

            await transaction.commit()

            return { message: '취소 성공' }

        } catch (error) {
            await transaction.rollback()
            return { errorMessage: error }
        }
    }
}

module.exports = UserService;
