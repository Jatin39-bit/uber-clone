const express=require('express')
const router=express.Router()
const {body,query}=require('express-validator')
const rideController=require('../controllers/ride.controller')
const authMiddleware=require('../middlewares/auth.middlewares')

router.post('/create',authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Inavalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Inavalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Inavalid vehicleType'),
    rideController.createRide 

)

router.get('/get-fare',authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Inavalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Inavalid destination address'),
    rideController.getFares
)

router.post('/confirm',authMiddleware.authCaptian,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),rideController.confirmRide
)

router.get('/start-ride',authMiddleware.authCaptian,
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid ride Id'),
    rideController.startRide
)

router.post('/end-ride',authMiddleware.authCaptian,
    body('rideId').isMongoId().withMessage('Invalid ride id'),rideController.endRide
)

module.exports=router