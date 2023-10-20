const ApiError = require("../utils/apiError")

const checkBody = (requiredProps) => {
	return (req, res, next) => {
		const undefinedProps = []
		for (const prop of requiredProps) {
			if (typeof req.body[prop] === undefined) {
				undefinedProps.push(prop)
			}
		}
		if (undefinedProps.length > 0) {
			return next(new ApiError(`${undefinedProps.toString()} harus ada`, 400))
		}
		next()
	}
}

module.exports = checkBody
