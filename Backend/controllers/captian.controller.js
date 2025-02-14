const captianModel = require('../models/captian.model')
const captianService = require('../services/captian.service')
const { validationResult } = require('express-validator')
const blacklistTokenModel=require('../models/blacklistToken.model')

module.exports.registerCaptian = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() })
    }

    const { fullname, email, password, vehicle } = req.body

    const isCaptianAlreadyExist = await captianModel.findOne({ email })
    if (isCaptianAlreadyExist) {
        return res.status(400).json({ message: 'Captian already exists' })
    }
    const hashedPassword = await captianModel.hashPassword(password)

    const captian = await captianService.createCaptian({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = await captian.generateAuthToken()
    res.status(200).json({ captian, token })
}

module.exports.loginCaptian=async (req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email,password}=req.body

    const captian = await captianModel.findOne({ email }).select('+password')


    if (!captian) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const isMatch = await captian.comparePassword(password)

    if (!isMatch) {
        return res.status(401).json({ mesaage: "Invalid email or password" })
    }
    const token = captian.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({ token, captian })
}

module.exports.getCaptianProfile=async(req,res,next)=>{
    res.status(200).json({captian:req.captian})
}

module.exports.logoutCaptian=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization.split(' ')[1]

    res.clearCookie('token')
    await blacklistTokenModel.create({token})

    res.status(200).json({message:"Logged out"})
}