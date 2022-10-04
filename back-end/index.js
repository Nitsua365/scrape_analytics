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

    console.log(`[${new Date(Date.now())}] connected`)

    const sys_data = {
        time: "*",
        cpuCurrentSpeed: "*",
        cpuTemperature: 'main, cores, max',
        mem: 'total, free, used, active, available, swaptotal, swapused, swapfree',
        networkStats: "*",
        processLoad: '(scrapy) *',
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

    const convertToMB = (mem) => {
        mem.available = mem.available / 1000000.0
        mem.free = mem.free / 1000000.0
        mem.active = mem.active / 1000000.0
        mem.used = mem.used / 1000000.0
        return mem
    }

    const closePing = cpuPercent((err, percent) => {
        if (err) console.error('CPU error:', err)

        sysInfo.get(sys_data, (data) => {
            data.cpuCurrentSpeed.percent = percent;
            data.time = new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false });
            data.mem = convertToMB({ ...data.mem })
            socket.emit("Sys", data)
        })
    }, 3000);


    // UPS battery analytics
    let closeUPSPing = setInterval(UPS_Analytics, 5000)

    socket.on("disconnect", (reason) => {
        clearInterval(closeUPSPing)
        closePing()
        console.log(`[${new Date(Date.now())}] disconnecting, ${reason}`);
    });
});

httpServer.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))

httpServer.on('error', (e) => {
    console.error('server err:', e)
})