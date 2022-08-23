const httpServer = require("http").createServer();
const { Server } = require("socket.io");
const cpu = require('cpu-percent');

const io = new Server(httpServer, {
    transports: ['websocket', 'polling']
});

io.on('connection', (socket) => {
    setInterval(() => {
        cpu((error, percent) => {
            if (error) console.error('error', error)
            else socket.emit('CPUPercent', percent)
        })
    }, 3000);
});

httpServer.listen(5516)