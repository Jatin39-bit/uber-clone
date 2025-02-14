const rideService=require('../services/ride.service')
const {validationResult}=require('express-validator')
const getFare=require('../services/ride.service')
const mapService=require('../services/maps.service')
const {sendMessageToSocketId}=require('../socket')
const rideModel=require('../models/ride.model')

module.exports.createRide=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

const {pickup,destination,vehicleType}=req.body 

    try{
        const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType})
        res.status(201).json(ride)

        const pickupCoordinates=await mapService.getAddressCoordinate(pickup)

        const captiansInRadius= await mapService.getCaptiansInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,5000)
        ride.otp=""

        const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user')

        captiansInRadius.map( captian=>{
            sendMessageToSocketId(captian.socketId,{
                event:'new-ride',
                data: rideWithUser
            })
        })

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

module.exports.getFares=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {pickup,destination}=req.query
    try{
        const fare=await getFare(pickup, destination)
        if(fare){
            return res.status(200).json(fare)
        }
    }catch{
        return res.status(400).json({message:'There was some error in getFare func'})
    }
}

module.exports.confirmRide=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{ rideId}=req.body

    try{
        const ride=await rideService.confirmRide({rideId,captian:req.captian})

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })

        return res.status(200).json(ride)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.startRide=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{ rideId,otp}=req.query
    console.log(rideId,otp)

    try{
        const ride=await rideService.startRide({rideId,otp,captian:req.captian})

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
            data:ride
        })
        return res.status(200).json(ride)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.endRide=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{ rideId}=req.body

    try{
        const ride=await rideService.endRide({rideId,captian:req.captian})

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-ended',
            data:ride
        })
        return res.status(200).json(ride)
    }catch(err){
        return res.status(500).json({err:err.message})
    }
}