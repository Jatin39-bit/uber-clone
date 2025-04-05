const http = require('http')
const app = require("./app")
const port = process.env.PORT || 3000

// Add middleware to handle CORS preflight requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).send();
});

const server = http.createServer(app)
const {initializeSocket}=require('./socket')
const cors=require('cors')

// Move CORS configuration to app.js to avoid duplication
// CORS is already configured in app.js but with different settings

initializeSocket(server)

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
