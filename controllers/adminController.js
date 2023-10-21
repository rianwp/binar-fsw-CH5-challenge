const bcrypt = require("bcrypt")
const { User, Auth } = require("../models")
const ApiError = require("../utils/apiError")

const createAdmin = async (req, res, next) => {
	try {
		const { name, email, password, confirmPassword, address } = req.body

		const admin = await Auth.findOne({
			where: {
				email,
			},
		})

		if (admin) {
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

		const newAdmin = await User.create({
			name,
			address,
			role: "admin",
		})
		await Auth.create({
			email,
			password: hashedPassword,
			userId: newAdmin.id,
		})

		res.status(201).json({
			status: "Success",
			data: {
				...newAdmin,
				email,
				password: hashedPassword,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 500))
	}
}

const findAdmins = async (req, res, next) => {
	try {
		const admins = await User.findAll({
			where: {
				role: ["admin", "superadmin"],
			},
			include: ["carsCreated", "carsUpdated", "Auth"],
		})

		res.status(200).json({
			status: "Success",
			data: {
				admins,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const findAdminById = async (req, res, next) => {
	try {
		const admin = await User.findOne({
			where: {
				id: req.params.id,
				role: ["admin", "superadmin"],
			},
			include: ["carsCreated", "carsUpdated", "Auth"],
		})

		if (!admin) {
			return next(new ApiError("Admin id tersebut gak ada", 404))
		}

		res.status(200).json({
			status: "Success",
			data: {
				admin,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const updateAdmin = async (req, res, next) => {
	const { name, address } = req.body
	try {
		const admin = await User.findOne({
			where: {
				id: req.params.id,
				role: "admin",
			},
		})

		if (!admin) {
			return next(new ApiError("Admin id tersebut gak ada", 404))
		}

		await User.update(
			{
				name,
				address,
			},
			{
				where: {
					id: req.params.id,
					role: "admin",
				},
			}
		)

		res.status(200).json({
			status: "Success",
			message: "sukses update admin",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const deleteAdmin = async (req, res, next) => {
	try {
		const admin = await User.findOne({
			where: {
				id: req.params.id,
				role: "admin",
			},
		})

		if (!admin) {
			return next(new ApiError("Admin id tersebut gak ada", 404))
		}

		await User.destroy({
			where: {
				id: req.params.id,
				role: "admin",
			},
		})

		await Auth.destroy({
			where: {
				userId: req.params.id,
			},
		})

		res.status(200).json({
			status: "Success",
			message: "sukses delete admin",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

module.exports = {
	createAdmin,
	findAdmins,
	findAdminById,
	updateAdmin,
	deleteAdmin,
}
