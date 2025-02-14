const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.model')
const captianModel = require('../models/captian.model')


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token })
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)

        if (!user.$isEmpty()) {
            req.user = user
            return next()
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports.authCaptian = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token })
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captian = await captianModel.findById(decoded._id)

        if (!captian.$isEmpty()) {
            req.captian = captian
            return next()
        }

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}