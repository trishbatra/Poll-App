const express = require("express")
const { logUserIn, signUserUp } = require("../controllers/authController")
const app = express()
const authRouter = express.Router()


authRouter.post("/login", logUserIn)
authRouter.post("/signup", signUserUp)

module.exports = {
    authRouter
}