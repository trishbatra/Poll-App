const express = require("express")
const { createThePoll, getAllPolls, DeleteAllPoles, deletePollById, getSpecificUsersPoll   } = require("../controllers/pollController")
const pollRouter = express.Router()

pollRouter.get("/getAllPoles", getAllPolls)
pollRouter.get("/getSpecificUsersPolls", getSpecificUsersPoll)
pollRouter.post("/createPoll", createThePoll)
pollRouter.delete("/DeleteAllPoles", DeleteAllPoles)
pollRouter.delete("/deleteById", deletePollById)

module.exports ={
    pollRouter
}