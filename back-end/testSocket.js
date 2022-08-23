const io = require('socket.io-client')
const env = require('dotenv')

const socket = io(`${process.env.CONNECT_STRING}`, {
    transports: ['websocket', 'polling']
})

socket.on('CPUPercent', (data) => {
    console.log(data)
})