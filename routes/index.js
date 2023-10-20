const router = require("express").Router()
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("../docs/swagger.json")

router.use("/api-docs", swaggerUI.serve)
router.use("/api-docs", swaggerUI.setup(swaggerDocument))

const Car = require("./carRouter")
const Admin = require("./adminRouter")
const Auth = require("./authRouter")
const Member = require("./memberRouter")

router.use("/api/v1/cars", Car)
router.use("/api/v1/auth", Auth)
router.use("/api/v1/members", Member)
router.use("/api/v1/admins", Admin)

module.exports = router
