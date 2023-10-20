require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express")
const yaml = require("js-yaml")
const ApiError = require("./utils/apiError")
const errorHandler = require("./controllers/errorController")

const router = require("./routes")

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"))
app.use(router)

// const swaggerDocument = yaml.load(
//   fs.readFileSync(
//     "./swagger/swagger.yaml",
//     "utf-8"
//   )
// )

// app.use(
//   "/api/v1/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument)
// )

app.all("*", (req, res, next) => {
	next(new ApiError(`Routes does not exist`, 404))
})

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server jalan di port : ${PORT}`)
})
