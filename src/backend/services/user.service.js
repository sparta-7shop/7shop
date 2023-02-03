const { Users } = require('../db');
const UserRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
	constructor ( userService ) {
		this.userService = userService;
	}

	userRepository = new UserRepository(Users);

	userSigup = async ( name, email, password, phone ) => {
		const hash = await bcrypt.hash(password, 12);

		const userSigup = await this.userRepository.userSigup(
			name, email, hash, phone
		);
		return userSigup;
	};

	userLogin = async ( loginInfo ) => {
		const user = await this.userRepository.findUser(loginInfo);

		const comparePassword = await bcrypt.compare(loginInfo.password, user.password);

		const accessToken = jwt.sign(
			{ id : user.id, },
			process.env.COOKIE_SECRET,
			{ expiresIn : '1d' }
		);

		return { status: 200, accessToken}


	};

}

module.exports = UserService;