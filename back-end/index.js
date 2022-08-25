const httpServer = require("http").createServer()
const { Server } = require("socket.io");
const cpu = require('cpu-percent')
const os = require('os')
const { exec } = require('node:child_process');
var sudo = require('sudo-js');

require('dotenv').config();

const io = new Server(httpServer, {
    transports: ['websocket', 'polling']
});

sudo.setPassword(process.env.PASSWORD);

io.on('connection', (socket) => {
    cpu((error, percent) => {
        // console.log('per', percent)
        if (error) console.error('cpu error', error)
        else {
            // get Battery life of UPS
            sudo.exec(['sudo', 'pwrstat', '-status'], (err, stdout, stderr) => {
                const batteryRegx = / [0-9]+ %/g
                // console.log(stdout)
                let data = { 
                    cpu : { percent },
                    uptime: os.uptime(),
                    time: new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }),
                    batteryLvl: stderr.match(batteryRegx)[0].split(' ')[1]
                };
                socket.emit('CPUPercent', data)
            })
        }
    }, 3000)
});

httpServer.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))

httpServer.on('error', (e) => {
    console.error('server err:', e)
})