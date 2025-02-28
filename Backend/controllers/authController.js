const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/User")
const secret = "iamveryimportantsecret"

const signUserUp =async (req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).send({err: "please provide all the details to create an user"})
        }
        const userAlready = await  UserModel.findOne({email:email})
        if(userAlready){
            return res.status(400).send({err: "user with this email already exists"})
        }
        const salt  = await bcrypt.genSalt(10)
        console.log(`salt is ${salt}`)
        const hashedPass =  await bcrypt.hash(password,salt)
    
        const userToCreate = await UserModel.create({
            name: name,
            email: email,
            password: hashedPass
        })
    
        const obj = {
            id : userToCreate._id
        }
        const token =  jwt.sign(obj,secret)
        return res.status(200).json({userCreated : userToCreate, token: token})
    } catch (error) {
        return res.status(400).send(`${error.message}`)
    }
}

const logUserIn = async (req,res)=>{
    try {
        const {email, password} = req.body 
        if(!email || !password){
            return res.status(400).send({err: "Please provide all the credentials"})
        }
        const findUser = await UserModel.findOne({email: email})
        if(!findUser){
            return res.status(400).send({err :"Incorrect email please enter the correct mail id"})
        }
        const isPassCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPassCorrect){
            return res.status(400).send({err: "incorrect password please enter correct password"})
        }
        const obj = {
            id  : findUser._id
        }
        const token = jwt.sign(obj, secret)
        return res.status(200).json({token,loogedInUser: findUser})
    } catch (error) {
        return res.status(400).send(`${error.message}`)
    }
}

module.exports = { signUserUp, logUserIn };