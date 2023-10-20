const ApiError = require("../utils/apiError")

const checkAccountOwnership = (req, res, next) => {
	if (req.user.id != req.params.id)
		return next(new ApiError("kamu bukan pemilik akun ini", 401))
	next()
}

module.exports = checkAccountOwnership
