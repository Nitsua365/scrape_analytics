const httpServer = require("http").createServer();
const { Server } = require("socket.io");

const io = new Server(httpServer, {
    transports: ['websocket', 'polling']
});

io.on('connection', (socket) => {
    cpu((error, percent) => {
        console.log('per', percent)
        if (error) console.error('error', error)
        else socket.emit('CPUPercent', { percent, time: Date.now() })
    }, 3000)
});

httpServer.listen(process.env.PORT)

httpServer.on('error', (e) => {
    console.error('server err:', e)
})