const Joi = require('joi');
const storage = require('./joi_storage');

//회원가입
const signupValidation = Joi.object({
	name : storage.getSignupName(),
	email : storage.getSignupEmail(),
	password : storage.getSignupPassword(),
	confirm : storage.getSignupConfirm(),
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