class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    postAddress = async (addressName) => {
        const address = await this.userRepository.create({ name: addressName, user_id: 1 })
        return address
    }
}

module.exports = UserRepository