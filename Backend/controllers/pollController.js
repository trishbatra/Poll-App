const jwt = require("jsonwebtoken")
const UserModel = require("../models/User")
const { pollModel } = require("../models/Poll")
const secret = "iamveryimportantsecret"

const createThePoll = async (req,res)=>{
    const token = req.headers.token 
    if(!token){
        return res.status(400).json({err: "NOT AUTHORIZED"})
    }
    const decode = jwt.verify(token,secret)
    if(!decode){
        return res.stauts(404).json({err: "INTERNAL SERVER ISSUE"})
    }
    const user = await UserModel.findById(decode.id)
    if(!user){
        return res.status(400).json({err: "INTERNAL SERVER ISSUE"})
    }
    const {pollQuestion, pollOptions} = req.body
    if(!pollOptions || !pollOptions){
        return res.status(400).send({err: "INTERNAL SERVER ISSUE"})
    }
    const CreatePoll =  await pollModel.create({
        pollQuestion : pollQuestion,
        pollOptions: pollOptions,
        user: decode.id
    })
    const allPoles = await pollModel.find({user: decode.id}).populate("user", "name")
    
    return res.status(200).json({decode, name: user.name, CreatePoll, allPoles})
}

const getAllPolls = async (req,res)=>{
    const allPoles = await pollModel.find({}).populate("user", "name")
    if(!allPoles.length < 0){
        return res.status(200).json({msg: "we dont have any poles man", length: allPoles.length})
    }
    return res.status(200).json({allPoles})
}

const DeleteAllPoles = async (req,res)=>{
    const {token} = req.headers 
    if(!token){
        return res.status(404).json({err: "Interal Server Error"})
    }
    const decode = jwt.verify(token,secret)
    if(!decode){
        return res.status(404).json({err: "Interal Server Error"})
    }
    const user = await UserModel.findOne({_id: decode.id })
    if(!user){
        return res.status(404).json({err: "Interal Server Error"})
    }
    const deleteRecords = await  pollModel.deleteMany({user : user._id})
    return res.status(200).json({id: user._id ,count:deleteRecords.deletedCount})
}

const deletePollById = async (req,res)=>{
    const id = req.query.id 
    console.log("id", id)
    if(!id){
        return res.status(404).json({err: "internal server error"})

    }
    const deleteted = await pollModel.findByIdAndDelete(id)
    return res.status(200).json(deleteted)
}

const getSpecificUsersPoll = async (req,res)=>{
    const token = req.headers.token
    if(!token){
        return res.status(404).json({err: "NOT AUTHORIZED"})
    }
    const decode = jwt.verify(token,secret)
    if(!decode){
        return res.status(404).json({err: "internal server error"})
    }
    const specificUserPolls = await pollModel.find({user: decode.id})
    const name = await UserModel.findOne({_id: decode.id} ).select(["name", "-_id"])
    return res.status(200).json({allPoles: specificUserPolls, user : name})
    
}

module.exports = {
    createThePoll,
    getAllPolls,
    DeleteAllPoles,
    deletePollById,
    getSpecificUsersPoll
}