const { Op } = require('sequelize');

class UserRepository {
	constructor ( userModels ) {
		this.userModels = userModels;
	}

	userSignup = async ( loginInfo ) => {
		await this.userModels.create({
			name : loginInfo.name,
			email : loginInfo.email,
			password : loginInfo.password,
			phone : loginInfo.phone,
		});
		return;
	};


	findUser = async ( loginInfo ) => {
		const findUser = await this.userModels.findOne({
			where : { [Op.or] : [ { email : loginInfo.email } ] }
		});
		console.log("333333findUser", findUser);
		return findUser;
	};


}

module.exports = UserRepository;