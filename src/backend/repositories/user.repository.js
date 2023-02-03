class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    /* -------------주소-----------------------------*/
    postAddress = async (addressName, userId) => {
        const address = await this.userRepository.create({ name: addressName, user_id: userId })
        return address
    }

    getAddress = async ({ userId }) => {
        const address = await this.userRepository.findAll({
            where: { user_id: userId }
        })
        return address
    }

    /* -------------결제-----------------------------*/
    payment = async ({ impUid, amount }) => {
        await this.userRepository.create({
            total_price: amount,
            impUid,
            status: 1
        })
    }

    checkDuplicate = async ({ impUid }) => {
        return await this.userRepository.findOne({
            where: { impUid },
            paranoid: false
        })
    }



    /* -------------결제취소---------------------------*/
    cancelUpdate = async ({ transaction, impUid }) => {
        return await this.userRepository.update(
            { status: 0 },
            { where: { impUid } },
            { transaction }
        )
    }
    cancelPayment = async ({ transaction, impUid }) => {
        const cancel = await this.userRepository.destroy(
            { where: { impUid } },
            { transaction }
        )
        return cancel
    }
    checkAlreadyCancel = async ({ impUid }) => {
        return await this.userRepository.findOne({
            where: {
                impUid,
                status: 0
            },
            paranoid: false
        })
    }
}

module.exports = UserRepository