const ApiError = require("../utils/apiError")

const checkAccountAndRole = (roles) => {
	return async (req, res, next) => {
		if (!roles.include(req.user.role) || req.user.id != req.params.id) {
			return next(
				new ApiError(
					`kamu bukan ${roles} atau kamu bukan pemilik akun jadi tidak bisa akses`,
					401
				)
			)
		}
		next()
	}
}

module.exports = checkAccountAndRole
