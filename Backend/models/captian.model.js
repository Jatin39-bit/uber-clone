const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captianSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be atleast 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be atleast 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color must be atleast 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be atleast 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [3, "Capacity must be atleast 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
})

captianSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
}

captianSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

captianSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const captianModel = mongoose.model('captian', captianSchema)

module.exports = captianModel