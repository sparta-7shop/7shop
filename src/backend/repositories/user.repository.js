//user Table
//name, email, password, phone
//cart Table

const { Sequelize } = require('sequelize');
const { Products } = require('../db')

//cartId, product_id, user_id, count
const { Op } = require('sequelize');

class UserRepository {
    constructor(userModel) {
        this.userModel = userModel
    }
    getCartItem = async (userId) => {
        try {
            return await this.userModel.findAll(
                {
                    where: { user_id: userId }
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    addCartItem = async (prodId, userId, count) => {
        try {
            return await this.userModel.create(
                {
                    product_id: prodId,
                    user_id: userId,
                    count
                },
                {
                    where: { user_id: userId }
                });
        } catch (error) {
            console.log(error);
        }
    }
    updateCartItemQuantity = async (userId, prodId, count) => {
        try {
            return await this.userModel.update(
                { count: Sequelize.literal(`count+${count}`) },
                { where: { user_id: userId, product_id: prodId } },
            )
        } catch (error) {
            console.log(error)
        }
    }
    updateCartStatus = async ({ id }) => {
        try {
            return await this.userModel.update(
                { status: 1 },
                { where: { user_id: id } }
            )
        } catch (error) {
            console.log(error);
        }
    }


    //쿠팡의 경우 cartitemIds[], itemStatus를 페이로드에 넣어 구분함
    deleteCartItem = async (userId, prodId) => {
        try {
            return await this.userModel.destroy(
                {
                    where: { user_id: userId, product_id: prodId }
                },
                {
                    truncate: true
                })
        } catch (error) {
            console.log(error);
        }
    }

    /* -------------주소-----------------------------*/
    postAddress = async (addressName, id) => {
        try {
            const address = await this.userModel.create({ name: addressName, user_id: id })
            return address
        } catch (error) {
            return { errorMessage: error }
        }
    }

    getAddress = async ({ id }) => {
        try {
            const address = await this.userModel.findAll(
                {
                    where: { user_id: id }
                }
            )
            return address
        } catch (error) {
            return { errorMessage: error }
        }
    }

    /* -------------결제-----------------------------*/
    orderProduct = async ({ addressName, id, paymentId, transaction }) => {
        try {
            return await this.userModel.create(
                { address: addressName, user_id: id, payment_id: paymentId },
                { transaction })
        } catch (error) {
            console.log(error);
            return { errorMessage: error }
        }
    }

    payment = async ({ impUid, amount, transaction }) => {
        try {
            return await this.userModel.create(
                { total_price: amount, impUid },
                { transaction }
            )
        } catch (error) {
            return { errorMessage: error }
        }
    }

    checkDuplicate = async ({ impUid }) => {
        try {
            return await this.userModel.findOne(
                {
                    where: { impUid },
                    paranoid: false
                }
            )
        } catch (error) {
            return { errorMessage: error }
        }
    }

    /* -------------결제취소---------------------------*/
    cancelPayment = async ({ transaction, impUid }) => {
        try {
            const cancel = await this.userModel.destroy(
                { where: { impUid } },
                { transaction }
            )
            return cancel
        } catch (error) {
            return { errorMessage: error }
        }
    }
    checkAlreadyCancel = async ({ impUid }) => {
        try {
            return await this.userModel.findOne(
                {
                    where: { impUid, },
                    paranoid: true
                }
            )
        } catch (error) {
            return { errorMessage: error }
        }
    }
    getUser = async (userId) => {
        try {
            return await this.userModel.findOne(
                {
                    where: { id: userId }
                }
            )
        } catch (error) {
            return { errorMessage: error }
            console.log(error);
        }
    }

    userSignup = async (loginInfo) => {
        await this.userModel.create({
            name: loginInfo.name,
            email: loginInfo.email,
            password: loginInfo.password,
            phone: loginInfo.phone,
        });
    };


    findUser = async (loginInfo) => {
        const findUser = await this.userModel.findOne({
            where: { [Op.or]: [{ email: loginInfo.email }] }
        });
        // console.log("333333findUser", findUser);
        return findUser;
    };

    userMypage = async () => {

    }

    getCartProductName = async (id) => {
        try {
            const getCartProduct = await this.userModel.findAll({
                where: { user_id: id },
                include: [{
                    model: Products,
                    attributes: ["id", "name", "img_path", "price"],
                }]
            })
            return getCartProduct;
        } catch (error) {
            return { errorMessage: error }
            console.log(error);
        }
    }

}


module.exports = UserRepository;