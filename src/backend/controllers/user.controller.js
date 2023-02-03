const { Users } = require('../db');
const UserService = require('../services/user.service');
const passport = require('passport');
const { userLoginValidation, signupValidation } = require('../validations');

class UserController {
	constructor ( userController ) {
		this.userController = userController;
	}

	userService = new UserService(Users);


	userSignup = async ( req, res ) => {
		try {
			const loginInfo = await signupValidation.validateAsync(req.body);

			const { status, message } = await this.userService.userSignup(loginInfo);

			return res.status(status).json({ message });

		} catch ( err ) {
			if(err.isJoi){
				return res.status(422).json({messge: err.details[0].message})
			}
			res.status(500).json({message: err.message})
		}

	};

	userLogin = async ( req, res, next ) => {
		const loginInfo = await userLoginValidation.validateAsync(req.body);

		const { status, message, accessToken } = await this.userService.userLogin(loginInfo);

		res.cookie('accessToken', accessToken);
		return res.status(status).json({ message: message , accessToken : accessToken || '' });
	};


	userLogout = ( req, res, next ) => {
		res.clearCookie('accessToken');
		return res.status(200).json({ message : '로그아웃 성공' });
	};

}

module.exports = UserController;