class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    postAddress = async (addressName, userId) => {
        const address = await this.userRepository.create({ name: addressName, user_id: userId })
        return address
    }
}

module.exports = UserRepository