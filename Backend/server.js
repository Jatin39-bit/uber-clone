const http = require('http')
const app = require("./app")
const port = process.env.PORT || 3000
const server = http.createServer(app)
const {initializeSocket}=require('./socket')
const cors=require('cors')

app.use(cors({
    origin:['https://uber-clone-backend.vercel.app','https://uber-clone-eight-eta.vercel.app'],
    methods:['GET','POST'],
    allowedHeaders:['Authorization'],
    credentials:true
}))


initializeSocket(server)

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
