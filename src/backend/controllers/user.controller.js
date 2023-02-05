const { Users } = require('../db');
const UserService = require('../services/user.service');
const passport = require('passport');
const { userLoginValidation, signupValidation } = require('../validations');

require('dotenv').config({ path : "../../../.env" });


class UserController {
	constructor ( userController ) {
		this.userController = userController;
	}

	userService = new UserService(Users);

// 회원가입
	userSignup = async ( req, res ) => {
		try {
			const loginInfo = await signupValidation.validateAsync(req.body);

			await this.userService.userSignup(loginInfo);

			return res.status(200).json({ message : "가입완료" });

		} catch ( err ) {
			if ( err.isJoi ) {
				return res.status(422).json({ messge : err.details[0].message });
			}
			res.status(500).json({ message : err.message });
		}

	};

// 메일 보내기
	sendMail = async ( req, res ) => {
		const { name, email } = req.body; // 보낼 이메일 주소, 이메일 제목, 이메일 본문, 받는 사람 이름

		await this.userService.sendMail(name, email);
		return res.status(200).json({ message : "전송 성공" });
	};

// 로그인
	userLogin = async ( req, res, next ) => {
		const loginInfo = await userLoginValidation.validateAsync(req.body);

		const { code, message, accessToken } = await this.userService.userLogin(loginInfo);

		res.cookie('accessToken', accessToken);
		return res.status(code).json({ message : message, accessToken : accessToken || undefined });
	};

// 로그아웃
	userLogout = ( req, res, next ) => {
		res.clearCookie('accessToken');
		return res.status(200).json({ message : '로그아웃 성공' });
	};

// 마이페이지
	userMypage = async (req,res) => {
		await this.userService.myPage()
	}

}


module.exports = UserController;