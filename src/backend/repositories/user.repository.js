//user Table
//name, email, password, phone
//cart Table
//cartId, product_id, user_id, count
const { Op } = require('sequelize');

class UserRepository {
    constructor(userModel) {
        this.userModel = userModel
    }
    getCartItem = async (userId) => {
        try {
          return await this.userModel.findAll({
              where: {user_id: userId}
            })
        }catch (error){
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
                where: {user_id: userId}
              });
        }catch (error){
            console.log(error);
        }
    }
    updateCartItemQuantity = async (userId,prodId,count) => {
      try{
        return await this.userModel.update({
          count
        }, {
          where: {user_id: userId, product_id: prodId}
        })
      } catch (error) {
        console.log(error)
      }
    }


    //쿠팡의 경우 cartitemIds[], itemStatus를 페이로드에 넣어 구분함
    deleteCartItem = async (userId, prodId) => {
        try {
          return await this.userModel.destroy({
                where: {user_id: userId, product_id: prodId}
              },
              {
                truncate: true
              })
        } catch (error){
            console.log(error);
        }
    }

  userSignup = async ( loginInfo ) => {
    await this.userModel.create({
      name : loginInfo.name,
      email : loginInfo.email,
      password : loginInfo.password,
      phone : loginInfo.phone,
    });
  };


  findUser = async ( loginInfo ) => {
    const findUser = await this.userModel.findOne({
      where : { [Op.or] : [ { email : loginInfo.email } ] }
    });
    console.log("333333findUser", findUser);
    return findUser;
  };

  userMypage = async () => {

  }


}


module.exports = UserRepository;