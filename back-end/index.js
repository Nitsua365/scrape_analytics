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

// set the password for sudo commands
sudo.setPassword(process.env.PASSWORD);

const BATTERY_REGEX = /[0-9]+ %/g

io.on('connection', (socket) => {

    const UPS_Analytics = () => {
        sudo.exec(['sudo', 'pwrstat', '-status'], (err, pid, output) => {
            if (err) console.error('UPS pwrstat error:', err, 'pid:', pid)
            socket.emit('UPS', {
                batteryLvl: output.match(BATTERY_REGEX)[0].split(' ')[0],
                load: {
                    percent: output.match(BATTERY_REGEX)[1].split(' ')[0],
                    wattage: output.match(/Load\.* [0-9]*/g)[0].split(' ')[1]
                },
                state: output.match(/State\.* [a-zA-Z0-9]*/g)[0].split(' ')[1]
            })
        })
    }
    
    const CPU_Analytics = (error, percent) => {
        // console.log('per', percent)
        if (error) console.error('cpu error', error)
        else {
            socket.emit('CPU', { 
                cpu : { percent },
                uptime: os.uptime(),
                time: new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }),
            })
        }
    }

    // send the initial polling data on connection
    UPS_Analytics();
    cpu(CPU_Analytics)();

    // CPU analytics
    cpu(CPU_Analytics, 3000)

    // UPS analytics
    setInterval(UPS_Analytics, 30000)
});

httpServer.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))

httpServer.on('error', (e) => {
    console.error('server err:', e)
})