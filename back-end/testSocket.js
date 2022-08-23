const io = require('socket.io-client')

const socket = io('ws://localhost:5516', {
    transports: ['websocket', 'polling']
})

socket.on('CPUPercent', (data) => {
    console.log(data)
})