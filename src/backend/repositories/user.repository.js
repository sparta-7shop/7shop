const { Op } = require('sequelize');

class UserRepository {
	constructor ( userModels ) {
		this.userModels = userModels;
	}

	userSigup = async ( name, email, hash, phone ) => {
		try {
			const userSigup = await this.userModels.create({
				name,
				email,
				password : hash,
				phone
			});
			return userSigup;
		} catch ( error ) {
			console.error(error);
		}
	}


		findUser = async ( loginInfo ) => {
			const findUser = await this.userModels.findOne({
				where: { [Op.or] : [ { email: loginInfo.email } ] }
			});
			console.log("333333findUser",findUser);
			return findUser
		};



}

module.exports = UserRepository;