const { Car } = require("../models")
const ApiError = require("../utils/apiError")

const createCar = async (req, res, next) => {
	const { name, price, imageUrl, capacity } = req.body

	try {
		const newCar = await Car.create({
			name,
			price,
			imageUrl,
			capacity,
      userId: req.user.id
		})

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
			include: ["User"],
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
			include: ["User"],
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
	const { name, price, imageUrl, capacity } = req.body
	try {
    const car = await Car.findOne({
			where: {
				id: req.params.id,
			},
		})

		if (!car) {
			return next(new ApiError("Car id tersebut gak ada", 404))
		}

		await Car.update(
			{
				name,
				price,
				imageUrl,
				capacity,
        userId: req.user.id
			},
			{
				where: {
					id: req.params.id,
				},
			}
		)

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
