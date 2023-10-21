const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Auth, User } = require("../models")
const ApiError = require("../utils/apiError")

const register = async (req, res, next) => {
	try {
		const { name, email, password, confirmPassword, address } = req.body

		const user = await Auth.findOne({
			where: {
				email,
			},
		})

		if (user) {
			return next(new ApiError("User email already taken", 400))
		}

		if (password <= 8) {
			return next(new ApiError("Minimum password must be 8 character", 400))
		}

		if (password !== confirmPassword) {
			return next(new ApiError("password does not match", 400))
		}

		const saltRounds = 10
		const hashedPassword = bcrypt.hashSync(password, saltRounds)

		const newUser = await User.create({
			name,
			address,
		})
		await Auth.create({
			email,
			password: hashedPassword,
			userId: newUser.id,
		})

		res.status(201).json({
			status: "Success",
			data: {
				newUser: {
					...newUser.dataValues,
					email,
					password: hashedPassword,
				},
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 500))
	}
}

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await Auth.findOne({
			where: {
				email,
			},
			include: ["User"],
		})

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = jwt.sign(
				{
					id: user.userId,
					username: user.User.name,
					role: user.User.role,
					email: user.email,
				},
				process.env.JWT_SECRET
			)

			res.status(200).json({
				status: "Success",
				message: "Berhasil login",
				data: {
					token,
				},
			})
		} else {
			return next(new ApiError("wrong password atau user gak ada", 400))
		}
	} catch (err) {
		next(new ApiError(err.message, 500))
	}
}

const authenticate = async (req, res) => {
	try {
		res.status(200).json({
			status: "Success",
			data: {
				user: req.user,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 500))
	}
}

module.exports = {
	register,
	login,
	authenticate,
}
