const httpServer = require("http").createServer()
const { Server } = require("socket.io");
const sysInfo = require('systeminformation');
const cpuPercent = require('cpu-percent');
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

    const sys_data = {
        time: "*",
        cpuCurrentSpeed: "*",
        cpuTemperature: 'main, cores, max',
        mem: 'total, free, used, active, available, swaptotal, swapused, swapfree',
        networkStats: "*",
        processLoad: '(scrapy) *',
        disksIO: '*'
    }

    // let Time_data = { 
    //     time: "*"
    // }

    // let CPU_data = {
    //     cpuCurrentSpeed: "*",
    //     cpuTemperature: 'main, cores, max'
    // }

    // let RAM_data = {
    //     mem: 'total, free, used, active, available, swaptotal, swapused, swapfree'
    // }

    // let Network_data = {
    //     networkStats: "*"
    // }

    // let Process_data = {
    //     processLoad: '(scrapy) *'
    // }

    // let Storage_data = {
    //     disksIO: '*'
    // }

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

    cpuPercent((err, percent) => {
        if (err) console.error('CPU error:', err)

        sysInfo.get(sys_data, (data) => {
            data.cpuCurrentSpeed.percent = percent;
            data.time = new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false });
            socket.emit("Sys", data)
        })

        // CPU analytics
        // sysInfo.get(CPU_data, (data) => socket.emit("CPU", { ...data, percent, time: Date.now() }));

        // // Time analytics
        // sysInfo.get(Time_data, (data) => socket.emit("Time", data));

        // // Memory/RAM analytics
        // sysInfo.get(RAM_data, (data) => socket.emit("Mem", data));

        // // Network analytics
        // sysInfo.get(Network_data, (data) => socket.emit("Net", data));

        // // Process usage anlytics
        // sysInfo.get(Process_data, (data) => socket.emit("Proc", data));

        // // Disk usage analytics
        // sysInfo.get(Storage_data, (data) => socket.emit("Storage", data));

    }, 3000)

    // UPS battery analytics
    UPS_Analytics();
    setInterval(UPS_Analytics, 10000)
});

httpServer.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))

httpServer.on('error', (e) => {
    console.error('server err:', e)
})