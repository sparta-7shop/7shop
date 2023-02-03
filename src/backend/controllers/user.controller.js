const { Users } = require('../db');
const UserService = require('../services/user.service');
const passport = require('passport');
const { userLoginValidation } = require('../validations');

class UserController {
	constructor ( userController ) {
		this.userController = userController;
	}

	userService = new UserService(Users);


	userSinup = async ( req, res ) => {
		const { name, email, password, phone } = req.body;

		const userSigup = await this.userService.userSigup(
			name,
			email,
			password,
			phone
		);

		return res.json({ 'msg' : '회원가입' });
	};

	// userSinup = async ( req, res ) => {
	// 	const user
	// }

	// userLogin = async ( req, res, next ) => {
	// 	const { email, password} = req.body
	//
	// 	const userLogin = await this.userService.userLogin
	// 	res.cookie('token', userLogin)
	//
	// };
	userLogin = async ( req, res, next ) => {
		const loginInfo = await userLoginValidation.validateAsync(req.body);

		const { status, accessToken } = await this.userService.userLogin(loginInfo)

		res.cookie('accessToken', accessToken);
		return res.status(status).json({accessToken: accessToken})
	};


userLogout = ( req, res, next ) => {
	res.clearCookie('accessToken')
	return res.status(200).json({message:'로그아웃 성공'})
};

}

module.exports = UserController;