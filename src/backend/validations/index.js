const Joi = require('joi');

// 회원가입
signupValidation = Joi.object({
	name : Joi.string().min(2).max(10).not().required(),
	email : Joi.string().email().required(),
	password : Joi.string().min(4).pattern(new RegExp('^[a-z0-9]*$')),
	confirm : Joi.ref('password'),
	phone : Joi.string().length(11).pattern(new RegExp('^[0-9]*$'))
});


// 로그인
const userLoginValidation = Joi.object({
	email : Joi.string().email().required(),
	password : Joi.string()
});

module.exports = {
	userLoginValidation,
};