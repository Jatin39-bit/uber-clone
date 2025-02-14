const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require("../controllers/user.controller")
const authMiddleware = require('../middlewares/auth.middlewares')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("password must be at least 6 characters long")
], userController.resgisterUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Emial'),
    body('password').isLength({ min: 6 }).withMessage('password length must be atleast 6 characters long')
], userController.loginUser)


router.get('/profile', authMiddleware.authUser, userController.getUserProfile)
router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router
