class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    /* -------------주소-----------------------------*/
    postAddress = async (addressName, userId) => {
        try {
            const address = await this.userRepository.create({ name: addressName, user_id: userId })
            return address
        } catch (error) {
            return { errorMessage: error }
        }
    }

    getAddress = async ({ userId }) => {
        try {
            const address = await this.userRepository.findAll({
                where: { user_id: userId }
            })
            return address
        } catch (error) {
            return { errorMessage: error }
        }
    }

    /* -------------결제-----------------------------*/
    payment = async ({ impUid, amount }) => {
        try {
            await this.userRepository.create({
                total_price: amount,
                impUid,
                status: 1
            })
        } catch (error) {
            return { errorMessage: error }
        }
    }

    checkDuplicate = async ({ impUid }) => {
        try {
            return await this.userRepository.findOne({
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
            return await this.userRepository.update(
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
            const cancel = await this.userRepository.destroy(
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
            return await this.userRepository.findOne({
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