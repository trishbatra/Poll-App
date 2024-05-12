const express = require("express")
const { connectToMongo } = require("./db")
const { authRouter } = require("./routes/Auth")
const app = express()
const cors = require("cors")
const { pollRouter } = require("./routes/Poll")
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use('/poll', pollRouter)

connectToMongo()


app.listen(5500, ()=>{
    console.log("server running at port 5500")
})