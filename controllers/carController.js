const { Car } = require("../models")
const ApiError = require("../utils/apiError")

const createCar = async (req, res, next) => {
	const { name, price, capacity } = req.body

	try {
		const file = req.file

		const createCarPayload = {
			name,
			price,
			capacity,
			createdBy: req.user.id,
		}

		if (file) {
			const split = file.originalname.split(".")
			const extension = split[split.length - 1]

			const uploadedImage = await imagekit.upload({
				file: file.buffer,
				fileName: `IMG-${Date.now()}.${extension}`,
			})
			createCarPayload.imageUrl = uploadedImage.url
		}
		const newCar = await Car.create(createCarPayload)

		res.status(200).json({
			status: "Success",
			data: {
				newCar,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const findCars = async (req, res, next) => {
	try {
		const cars = await Car.findAll({
			include: ["createdByUser", "updatedByUser"],
		})

		res.status(200).json({
			status: "Success",
			data: {
				cars,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const findCarById = async (req, res, next) => {
	try {
		const car = await Car.findOne({
			where: {
				id: req.params.id,
			},
			include: ["createdByUser", "updatedByUser"],
		})

		if (!car) {
			return next(new ApiError("Car id tersebut gak ada", 404))
		}

		res.status(200).json({
			status: "Success",
			data: {
				car,
			},
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const updateCar = async (req, res, next) => {
	const { name, price, capacity } = req.body
	try {
		const car = await Car.findOne({
			where: {
				id: req.params.id,
			},
		})

		if (!car) {
			return next(new ApiError("Car id tersebut gak ada", 404))
		}

		const file = req.file

		const updateCarPayload = {
			name,
			price,
			capacity,
			updatedBy: req.user.id,
		}

		if (file) {
			const split = file.originalname.split(".")
			const extension = split[split.length - 1]

			const uploadedImage = await imagekit.upload({
				file: file.buffer,
				fileName: `IMG-${Date.now()}.${extension}`,
			})
			updateCarPayload.imageUrl = uploadedImage.url
		}

		await Car.update(updateCarPayload, {
			where: {
				id: req.params.id,
			},
		})

		res.status(200).json({
			status: "Success",
			message: "sukses update car",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

const deleteCar = async (req, res, next) => {
	try {
		const car = await Car.findOne({
			where: {
				id: req.params.id,
			},
		})

		if (!car) {
			return next(new ApiError("Car id tersebut gak ada", 404))
		}

		await Car.destroy({
			where: {
				id: req.params.id,
			},
		})

		res.status(200).json({
			status: "Success",
			message: "sukses delete car",
		})
	} catch (err) {
		next(new ApiError(err.message, 400))
	}
}

module.exports = {
	createCar,
	findCars,
	findCarById,
	updateCar,
	deleteCar,
}
