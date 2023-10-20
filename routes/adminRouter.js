const router = require("express").Router()

const Admin = require("../controllers/adminController")

const authenticate = require("../middlewares/authenticate")
const checkAccountAndRole = require("../middlewares/checkAccountandRole")
const checkBody = require("../middlewares/checkBody")
const checkRole = require("../middlewares/checkRole")

// Untuk mengakses edit, delete dan get by id admin,
// harus melakukan login dengan admin tersebut atau
// role yang lebih tinggi (superadmin)

// Untuk mengakses get all data dari admin atau member,
// harus memiliki role yang lebih tinggi
// (untuk mengakses all data dari admin harus memiliki role superadmin)

router.post(
	"/",
	authenticate,
	checkRole(["superadmin"]),
	checkBody(["name", "email", "password"]),
	Admin.createAdmin
)
router.get("/", authenticate, checkRole(["superadmin"]), Admin.findAdmins)
router.get(
	"/:id",
	authenticate,
	checkAccountAndRole(["superadmin"]),
	Admin.findAdminById
)
router.patch(
	"/:id",
	authenticate,
	checkAccountAndRole(["superadmin"]),
	Admin.updateAdmin
)
router.delete(
	"/:id",
	authenticate,
	checkAccountAndRole(["superadmin"]),
	Admin.deleteAdmin
)

module.exports = router
