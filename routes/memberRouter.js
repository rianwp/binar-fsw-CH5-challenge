const router = require("express").Router()

const Member = require("../controllers/memberController")

const authenticate = require("../middlewares/authenticate")
const checkAccountOwnership = require("../middlewares/checkAccountOwnership")
const checkAccountAndRole = require("../middlewares/checkAccountandRole")
const checkRole = require("../middlewares/checkRole")

// Untuk mengakses delete dan get by id member,
// harus melakukan login dengan member tersebut atau
// role yang lebih tinggi (superadmin, admin)

// Untuk mengakses get all data dari admin atau member,
// harus memiliki role yang lebih tinggi
// (untuk mengakses all data dari member harus memiliki role admin atau superadmin)

router.get(
	"/",
	authenticate,
	checkRole(["superadmin", "admin"]),
	Member.findMembers
)
router.get(
	"/:id",
	authenticate,
	checkAccountAndRole(["superadmin", "admin"]),
	Member.findMemberById
)

// Untuk api edit member hanya bisa dilakukan oleh member yang memiliki id tersebut
router.patch("/:id", authenticate, checkAccountOwnership, Member.updateMember)
router.delete(
	"/:id",
	authenticate,
	checkAccountAndRole(["superadmin", "admin"]),
	Member.deleteMember
)

module.exports = router
