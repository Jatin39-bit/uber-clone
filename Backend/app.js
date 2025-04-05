const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require("cors")
const connectToDb = require("./db/db")
const userRoutes = require('./routes/user.routes')
const cookie = require('cookie-parser')
const captianRoutes = require('./routes/captian.routes')
const mapRoutes=require('./routes/maps.routes')
const rideRoutes=require('./routes/ride.routes')

connectToDb()

app.use(cors({
    origin: ['https://uber-clone-backend.vercel.app', 'https://uber-clone-eight-eta.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: true }))


app.use('/users', userRoutes)
app.use('/captian', captianRoutes)
app.use('/map',mapRoutes)
app.use('/ride',rideRoutes)

app.get('*', (req, res) => {
    res.send("your URL is not correct ")
})



module.exports = app