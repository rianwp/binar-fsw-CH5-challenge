const router = require("express").Router()

const User = require("../controllers/userController")

const authenticate = require("../middlewares/authenticate")
const checkAccountOwnership = require("../middlewares/checkAccountOwnership")
const checkAccountAndRole = require("../middlewares/checkAccountandRole")
const checkRole = require("../middlewares/checkRole")

// Untuk mengakses delete dan get by id user,
// harus melakukan login dengan user tersebut atau
// role yang lebih tinggi (superadmin, admin)

// Untuk mengakses get all data dari admin atau user,
// harus memiliki role yang lebih tinggi
// (untuk mengakses all data dari user harus memiliki role admin atau superadmin)

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

// Untuk api edit user hanya bisa dilakukan oleh user yang memiliki id tersebut
router.patch("/:id", authenticate, checkAccountOwnership, User.updateUser)
router.delete(
	"/:id",
	authenticate,
	checkAccountAndRole(["superadmin", "admin"]),
	User.deleteUser
)

module.exports = router
