const { Users } = require('../db');
const UserRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
	constructor ( userService ) {
		this.userService = userService;
	}

	userRepository = new UserRepository(Users);


//ㅎ
	userSignup = async ( loginInfo ) => {
		const hashedPassword = await bcrypt.hash(loginInfo.password, 12);
		loginInfo.password = hashedPassword;

		const userSignup = await this.userRepository.userSignup(loginInfo);
	};

	userLogin = async ( loginInfo ) => {
		try {
			const user = await this.userRepository.findUser(loginInfo);

			if ( !user ) {
				return { status : 400, message : "가입되지않은 회원 입니다." };
			}

			const comparePassword = await bcrypt.compare(loginInfo.password, user.password);

			if ( !comparePassword ) {
				return { status : 400, message : "비밀번호가 일치하지않습니다." };
			}

			const accessToken = jwt.sign(
				{ id : user.id, },
				process.env.COOKIE_SECRET,
				{ expiresIn : '1d' }
			);

			return { status : 200, message : '회원가입 완료', accessToken };

		} catch ( err ) {
			return { status : 500, message : "예상치못한 오류 입니다." };
		}
	};


}

module.exports = UserService;