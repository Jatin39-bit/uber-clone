
const mapService=require('../services/maps.service')
const {validationResult}=require('express-validator')

module.exports.getCoordinates=async(req,res,next)=>{
    const errors=validationResult(req)
    const {address}=req.query
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const coordinates=await mapService.getAddressCoordinate(address)
        if(coordinates){
            res.status(200).json(coordinates)
        }else{
            res.status(500).json({message:'Internal service error'})
        }
    }catch(error){
        res.status(404).json({message:'Coordinate not found'})
    }
}

module.exports.getDistanceTime=async(req,res,next)=>{
    const errors=validationResult(req)
    const {origin, destination}=req.query

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const DistanceTime=await mapService.getDistanceTime(origin,destination)
        res.status(200).json(DistanceTime)
        
    }catch(err){
        throw err
    }
}

module.exports.getAutoCompleteSuggestions=async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const {input}=req.query
        const suggestions=await mapService.getAutoCompletesuggestions(input)

        if(suggestions){
            return res.status(200).json(suggestions)
        }
    }catch(err){
        throw err
    }
}