const io = require('socket.io-client')

const socket = io('ws://67.198.83.234:5516', {
    transports: ['websocket', 'polling']
})

socket.on('CPUPercent', (data) => {
    console.log(data)
})