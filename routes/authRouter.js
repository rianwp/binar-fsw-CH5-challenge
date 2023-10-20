const router = require("express").Router()

const authenticate = require("../middlewares/authenticate")
const Auth = require("../controllers/authController")
const checkBody = require("../middlewares/checkBody")

router.post(
	"/register",
	checkBody(["name", "email", "password"]),
	Auth.register
)
router.post("/login", Auth.login)
router.get("/me", authenticate, Auth.authenticate)

module.exports = router
