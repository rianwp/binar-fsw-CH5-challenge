const router = require("express").Router()

const User = require("../controllers/userController")

const authenticate = require("../middlewares/authenticate")
const checkAccountOwnership = require("../middlewares/checkAccountOwnership")
const checkAccountAndRole = require("../middlewares/checkAccountandRole")
const checkRole = require("../middlewares/checkRole")

router.get(
	"/",
	authenticate,
	checkRole(["superadmin", "admin"]),
	User.findUsers
)
router.get(
	"/:id",
	authenticate,
	checkAccountAndRole(["superadmin", "admin"]),
	User.findUserById
)
router.patch("/:id", authenticate, checkAccountOwnership, User.updateUser)
router.delete(
	"/:id",
	authenticate,
	checkAccountAndRole(["superadmin", "admin"]),
	User.deleteUser
)

module.exports = router
