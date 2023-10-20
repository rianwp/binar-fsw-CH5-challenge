const { User, Auth } = require("../models")
const ApiError = require("../utils/apiError")

const findMembers = async (req, res, next) => {
	try {
		const members = await User.findAll({
			where: {
				role: "member",
			},
			include: ["Auth"],
		})

		res.status(200).json({
			status: "Success",
			data: {
				members,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const findMemberById = async (req, res, next) => {
	try {
		const member = await User.findOne({
			where: {
				id: req.params.id,
				role: "member",
			},
			include: ["Auth"],
		})

		if (!member) {
			return next(new ApiError("Member id tersebut gak ada", 404))
		}

		res.status(200).json({
			status: "Success",
			data: {
				member,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const updateMember = async (req, res, next) => {
	const { name, address } = req.body
	try {
		const member = await User.findOne({
			where: {
				id: req.params.id,
				role: "member",
			},
		})

		if (!member) {
			return next(new ApiError("Member id tersebut gak ada", 404))
		}

		await User.update(
			{
				name,
				address,
			},
			{
				where: {
					id: req.params.id,
					role: "member",
				},
			}
		)

		res.status(200).json({
			status: "Success",
			message: "sukses update member",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const deleteMember = async (req, res, next) => {
	try {
		const member = await User.findOne({
			where: {
				id: req.params.id,
				role: "member",
			},
		})

		if (!member) {
			return next(new ApiError("Member id tersebut gak ada", 404))
		}

		await User.destroy({
			where: {
				id: req.params.id,
				role: "member",
			},
		})

		await Auth.destroy({
			where: {
				userId: req.params.id,
			},
		})

		res.status(200).json({
			status: "Success",
			message: "sukses delete member",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

module.exports = {
	findMembers,
	findMemberById,
	updateMember,
	deleteMember,
}
