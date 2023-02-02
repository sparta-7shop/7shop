class UserRepository {
    constructor(userModel) {
        this.userModel = userModel
    }
    getCart = async (userId) => {
        try {
            const getCart = await this.userModel.findOne({ where: { id: userId } })
            console.log('카트 불러오기', getCart)
            return getCart
        }catch (error){
            console.log(error);
        }
    }





}

module.exports = UserRepository