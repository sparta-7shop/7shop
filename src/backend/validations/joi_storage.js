const Joi = require("joi");

// 회원가입
module.exports.getSignupName = () => {
	return Joi.string().min(2).required().messages({
		'string.base' : "이건 머누",
		'string.min' : "이름은 2글자 이상 적어주세요",
		'any.required' : "이름을 입력해주세요"
	});
};

module.exports.getSignupEmail = () => {
	return Joi.string().email().required().messages({
		'string.base' : "이건 머누",
		'string.email' : "email 형식을 지켜주세요",
		'any.required' : "email을 입력해주세요",
	});
};

module.exports.getSignupPassword = () => {
	return Joi.string().min(3).pattern(new RegExp('^[a-z0-9]*$')).required().messages({
		'string.base' : "이건 머누",
		'string.min' : "비밀번호 3글자 이상 해주세요",
		'string.pattern.base' : "비밀번호 형식에 맞지 않습니다.",
		'any.required' : "비밀번호을 입력해주세요",
	})
}

module.exports.getSignupConfirm = () => {
	return Joi.ref('password')
}

module.exports.getSignupPhone = () => {
return Joi.string().length(11).pattern(new RegExp('^[0-9]*$')).required().messages({
		'string.base' : "이건 머누",
		'string.length' : "핸드폰 번호를 확인해주세요 (11주)",
		'string.pattern.base' : "핸드폰 번호를 형식에 맞지 않습니다.",
		'any.required' : "핸드폰 번호를 입력해주세요",
	}
)}

// 로그인
module.exports.getLoginEmail = () => {
	return Joi.string().email().required().messages({
		'string.base' : "이건 머누",
		'string.email' : "email 형식을 지켜주세요",
		'any.required' : "email을 입력해주세요",
	});
};