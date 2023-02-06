//user Table
//name, email, password, phone
//cart Table
//cartId, product_id, user_id, count
class UserRepository {
    constructor(userModel) {
        this.userModel = userModel
    }
    getCartItem = async (userId) => {
        try {
            return await this.userModel.findAll({
                where: { user_id: userId }
            })
        } catch (error) {
            console.log(error);
        }
    }
    addCartItem = async (prodId, userId, count) => {
        try {
            return await this.userModel.create({
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
            return await this.userModel.update({
                count
            }, {
                where: { user_id: userId, product_id: prodId }
            })
        } catch (error) {
            console.log(error)
        }
    }


    //쿠팡의 경우 cartitemIds[], itemStatus를 페이로드에 넣어 구분함
    deleteCartItem = async (userId, prodId) => {
        try {
            return await this.userModel.destroy({
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
    postAddress = async (addressName, userId) => {
        try {
            const address = await this.userModel.create({ name: addressName, user_id: userId })
            return address
        } catch (error) {
            return { errorMessage: error }
        }
    }

    getAddress = async ({ userId }) => {
        try {
            const address = await this.userModel.findAll({
                where: { user_id: userId }
            })
            return address
        } catch (error) {
            return { errorMessage: error }
        }
    }

    /* -------------결제-----------------------------*/
    orderProduct = async ({ addressName, userId, paymentId, transaction }) => {
        try {
            return await this.userModel.create(
                { address: addressName, user_id: userId, payment_id: paymentId },
                { transaction })
        } catch (error) {
            console.log(error);
            return { errorMessage: error }
        }
    }

    payment = async ({ impUid, amount, transaction }) => {
        try {
            return await this.userModel.create({
                total_price: amount,
                impUid,
            },
                { transaction })
        } catch (error) {
            return { errorMessage: error }
        }
    }

    checkDuplicate = async ({ impUid }) => {
        try {
            return await this.userModel.findOne({
                where: { impUid },
                paranoid: false
            })
        } catch (error) {
            return { errorMessage: error }
        }
    }



    /* -------------결제취소---------------------------*/
    cancelUpdate = async ({ transaction, impUid }) => {
        try {
            return await this.userModel.update(
                { status: 0 },
                { where: { impUid } },
                { transaction }
            )
        } catch (error) {
            return { errorMessage: error }
        }
    }
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
            return await this.userModel.findOne({
                where: {
                    impUid,
                    status: 0
                },
                paranoid: false
            })
        } catch (error) {
            return { errorMessage: error }
        }
    }
}

module.exports = UserRepository