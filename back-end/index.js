const httpServer = require("http").createServer()
const { Server } = require("socket.io");
const sysInfo = require('systeminformation');
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

    let Time_data = { 
        time: "*"
    }

    let CPU_data = {
        cpuCurrentSpeed: "*",
        cpuTemperature: 'main, cores, max'
    }

    let RAM_data = {
        mem: 'total, free, used, active, available, swaptotal, swapused, swapfree'
    }

    let Network_data = {
        networkStats: "*"
    }

    let Process_data = {
        processLoad: '(scrapy) *'
    }

    let Storage_data = {
        disksIO: '*'
    }

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

    // Time analytics
    sysInfo.observe(Time_data, 3000, (data) => socket.emit("Time", data));

    // CPU analytics
    sysInfo.observe(CPU_data, 3000, (data) => socket.emit("CPU", data));

    // Memory/RAM analytics
    sysInfo.observe(RAM_data, 3000, (data) => socket.emit("Mem", data));

    // Network analytics
    sysInfo.observe(Network_data, 3000, (data) => socket.emit("Net", data));

    // Process usage anlytics
    sysInfo.observe(Process_data, 3000, (data) => socket.emit("Proc", data));

    // Disk usage analytics
    sysInfo.observe(Storage_data, 3000, (data) => socket.emit("Storage", data))

    // UPS battery analytics
    UPS_Analytics();
    setInterval(UPS_Analytics, 10000)
});

httpServer.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))

httpServer.on('error', (e) => {
    console.error('server err:', e)
})