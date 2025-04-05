const socketIo = require('socket.io')
const userModel = require('./models/user.model')
const captianModel = require('./models/captian.model')

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: ['https://uber-clone-backend.vercel.app','https://uber-clone-eight-eta.vercel.app'],
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            } else if (userType === 'captian') {
                await captianModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            }

            socket.on('update-location-captian', async (data) => {
                const { userId, location } = data
                if (!location || !location.lat || !location.lng) {
                    console.log('Invalid location', location)
                    return socket.emit('error', { message: "Invalid location" })
                }
                
                await captianModel.findByIdAndUpdate(userId,
                    {
                        location: {
                            ltd: location.lat,
                            lng: location.lng
                        }
                    })
            })


            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`)
            })
        })
    })
}

function sendMessageToSocketId(socketId, messageObject) {
    console.log('Sending message without io to socket id:', socketId , messageObject)
    if (io) {
        console.log('Sending message to socket id:', socketId , messageObject)
        io.to(socketId).emit(messageObject.event, messageObject.data)
    } else {
        console.log('Socket.io not intialized');

    }
}

module.exports = { initializeSocket, sendMessageToSocketId }