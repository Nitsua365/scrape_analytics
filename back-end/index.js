const httpServer = require("http").createServer();
const { Server } = require("socket.io");
const cpu = require('cpu-percent')

require('dotenv').config();

const io = new Server(httpServer, {
    transports: ['websocket', 'polling']
});

io.on('connection', (socket) => {
    cpu((error, percent) => {
        // console.log('per', percent)
        if (error) console.error('error', error)
        else socket.emit('CPUPercent', { percent, time: new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) })
    }, 3000)
});

httpServer.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))

httpServer.on('error', (e) => {
    console.error('server err:', e)
})