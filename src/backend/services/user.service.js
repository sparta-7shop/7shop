const { Users } = require('../db');
const UserRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const storage = require('../validations/joi_storage');
const nodemailer = require('nodemailer');
require('dotenv').config({ path : "../../../.env" });
const env = process.env;

class UserService {
	constructor ( userService ) {
		this.userService = userService;
	}

	userRepository = new UserRepository(Users);


// 회원가입
	userSignup = async ( loginInfo ) => {
		const hashedPassword = await bcrypt.hash(loginInfo.password, 12);
		loginInfo.password = hashedPassword;

		const userSignup = await this.userRepository.userSignup(loginInfo);
	};

// // 인증메일
	sendMail = async ( name, email ) => {
		try {
			// 전송하기
			let transporter = nodemailer.createTransport({
				service : 'gmail',
				host : 'smtp.gmail.com', // gmail server 사용
				port : 587,
				secure : false,
				auth : {
					user : env.MAIL, // 보내는 사람의 구글계정 메일
					pass : env.MAILPASSWORD, // 보내는 사람의 구글계정 비밀번호 (또는 생성한 앱 비밀번호)
				},
			});

			// 보낼 메세지
			let message = {
				from : env.MAIL, // 보내는 사람
				to : `${ name }<${ email }>`, // 받는 사람 이름과 이메일 주소
				subject : '회원가입 메일 테스트', // 메일 제목html
				html : `<div
      style='
      text-align: center;
      width: 50%;
      height: 60%;
      margin: 15%;
      padding: 20px;
      box-shadow: 1px 1px 3px 0px #999;
      '>
      <h2>${ name } 님, 안녕하세요.</h2> <br/>
      <h2>제목: 회원가입 메일 테스트</h2> <br/>
      회원가입 메일 테스트<br/>
      인증번호 : ${ storage.getSignupEmailConfirm() }<br/><br/><br/>
      </div>`,
			};


			// 메일이 보내진 후의 콜백 함수
			transporter.sendMail(message, ( err ) => {
				if ( err ) {
					console.error(err);
					return { code : 400, message : "if err 절 입니다." };
				} else
					return { code : 200, message : '메일전송 완료' };

			});
		} catch ( err ) {
		}
	};

// 로그인
	userLogin = async ( loginInfo ) => {
		try {
			const user = await this.userRepository.findUser(loginInfo);

			if ( !user ) {
				return { code : 400, message : "가입되지않은 회원 입니다." };
			}

			const comparePassword = await bcrypt.compare(loginInfo.password, user.password);

			if ( !comparePassword ) {
				return { code : 400, message : "비밀번호가 일치하지않습니다." };
			}

			const accessToken = jwt.sign(
				{ id : user.id, },
				process.env.COOKIE_SECRET,
				{ expiresIn : '1d' }
			);

			return { code : 200, message : '로그인 완료', accessToken };

		} catch ( err ) {
			return { code : 500, message : "예상치못한 오류 입니다." };
		}
	};

// 마이페이지
 userMypage = async () => {
	 const userSignup = await this.userRepository.userMypage();

 }

}

module.exports = UserService;