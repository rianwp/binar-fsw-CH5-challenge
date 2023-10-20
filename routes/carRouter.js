const router = require("express").Router()

const Car = require("../controllers/carController")

const authenticate = require("../middlewares/authenticate")
const checkBody = require("../middlewares/checkBody")
const checkRole = require("../middlewares/checkRole")

router.post(
	"/",
	authenticate,
	checkRole(["admin", "superadmin"]),
	checkBody(["name", "price", "capacity"]),
	Car.createCar
)
router.get("/", Car.findCars)
router.get("/:id", Car.findCarById)
router.patch(
	"/:id",
	authenticate,
	checkRole(["admin", "superadmin"]),
	Car.updateCar
)
router.delete(
	"/:id",
	authenticate,
	checkRole(["admin", "superadmin"]),
	Car.deleteCar
)

module.exports = router
