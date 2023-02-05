const Joi = require('joi');
const storage = require('./joi_storage');

//회원가입
const signupValidation = Joi.object({

	name : storage.getSignupName(),
	email : storage.getSignupEmail(),
	emailConfirm: Joi.equal(storage.getSignupEmailConfirm()).required().messages({
		'any.only':'인증번호가 일치하지 않습니다.'
	}),
	password : storage.getSignupPassword(),
	passwordConfirm : storage.getSignupPasswordConfirm(),
	phone : storage.getSignupPhone()
});


// 로그인
const userLoginValidation = Joi.object({
	email : Joi.string().email().required(),
	password : Joi.string()
});

module.exports = {
	userLoginValidation,
	signupValidation
};