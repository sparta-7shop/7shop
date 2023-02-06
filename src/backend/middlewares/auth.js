const { Users } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path : "../../../.env" });
// const authMiddleware

module.exports = async ( req, res, next ) => {
	try {
		const { accessToken } = req.cookies;

		if ( !accessToken ) {
			return res.status(401).json({ message : "로그인 후 이용 가능한 기능입니다." });
		}

		const { id, name } = jwt.verify(accessToken, process.env.COOKIE_SECRET);
		res.locals.user = await Users.findOne({
			where : { id, name }
		})
		console.log("안녀어어엉",id, name)
		next()

	} catch ( err ) {
		res.status(401).json({message:'로그인 후 이용이 가능한 기능입니다.'})

	}
};

