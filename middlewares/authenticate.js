const jwt = require("jsonwebtoken")
const { User, Auth } = require("../models")
const ApiError = require("../utils/apiError")

module.exports = async (req, res, next) => {
	try {
		const bearerToken = req.headers.authorization

		if (!bearerToken) {
			return next(new ApiError("token nya gak ada", 401))
		}

		const token = bearerToken.split("Bearer ")[1]

		const payload = jwt.verify(token, process.env.JWT_SECRET)
		console.log(payload)
		const user = await User.findByPk(payload.id, {
			include: ["Auth"],
		})

		if (!user) {
			return next(
				new ApiError("User dengan token login ini tidak ditemukan", 401)
			)
		}

		req.user = user
		next()
	} catch (err) {
		next(new ApiError(err.message, 500))
	}
}
