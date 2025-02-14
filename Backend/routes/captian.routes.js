const express = require('express')
const captianController = require('../controllers/captian.controller')
const router = express.Router()
const { body } = require('express-validator')
const authMiddleware=require('../middlewares/auth.middlewares')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 charaters long'),
    body('password').isLength({ min: 6 }).withMessage('password must be atleast 6 charaters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('color must be atleast 3 charaters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('plate must be atleast 3 charaters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid type of vehicle')
], captianController.registerCaptian)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Emial'),
    body('password').isLength({ min: 6 }).withMessage('password length must be atleast 6 characters long')],
    captianController.loginCaptian
)

router.get('/profile',authMiddleware.authCaptian,captianController.getCaptianProfile)

router.get('/logout',authMiddleware.authCaptian,captianController.logoutCaptian)
module.exports = router