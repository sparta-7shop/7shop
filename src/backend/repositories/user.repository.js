class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    postAddress = async (addressName, userId) => {
        const address = await this.userRepository.create({ name: addressName, user_id: userId })
        return address
    }

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


    checkAlreadyCancel = async ({ impUid }) => {
        return await this.userRepository.findOne({
            where: {
                impUid,
                status: 0
            },
            paranoid: false
        })
    }

    cancelUpdate = async ({ impUid }) => {
        return await this.userRepository.update(
            { status: 0 },
            { where: { impUid } }
        )
    }
    cancelPayment = async ({ impUid }) => {
        const cancel = await this.userRepository.destroy({ where: { impUid } }
        )
        return cancel
    }
}

module.exports = UserRepository