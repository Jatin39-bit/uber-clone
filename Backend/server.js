const http = require('http')
const app = require("./app")
const port = process.env.PORT || 3000
const server = http.createServer(app)
const {initializeSocket}=require('./socket')
const cors=require('cors')

// Move CORS configuration to app.js to avoid duplication
// CORS is already configured in app.js but with different settings

initializeSocket(server)

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
