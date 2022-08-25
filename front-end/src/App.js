import React from 'react';

import './App.css';

import io from 'socket.io-client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Label
} from 'recharts'

import { Box, LinearProgress } from '@mui/material'

import useSocket from './utils/useSocket';

const socket = io(`${process.env.REACT_APP_CONNECT_STRING}`, {
  transports: ['websocket', 'polling']
})

function App() {

  const CPUData = useSocket(socket, 'CPU');
  const batteryData = useSocket(socket, 'UPS')

  return ( CPUData.hasData &&
    <>
      <div>
        <LineChart
          width={700} 
          height={300} 
          data={CPUData.data}
        >
          {(CPUData.hasData) ? 
          (
            <>
              <XAxis dataKey='time'>
                <Label value="Time" position="bottom" offset={-10} />
              </XAxis>
              <YAxis dataKey='cpu.percent' label={{ value: 'CPU Percent %', angle: -90, position: 'centerLeft' }} />
              <Line type="monotone" dataKey="cpu.percent" stroke="#006eff" animationDuration={400} />
            </>
          ) : (
            <>
              <div>
                Loading...
              </div>
            </>
          )}

        </ LineChart>
      </div>
      {batteryData.hasData && (
      <div style={{ marginLeft: '16px', marginTop: '16px', marginBottom: '16px' }}>
        <Box>
          <LinearProgress color='success' sx={{ maxWidth: 100 }} variant='determinate' value={batteryData.mostRecentResult.batteryLvl} />
        </Box>
        <div>
          Battery: {batteryData.mostRecentResult.batteryLvl} %
        </div>
        <div>
          Load(W): {batteryData.mostRecentResult.load.wattage}
        </div>
        <div>
          Load(%): {batteryData.mostRecentResult.load.percent} %
        </div>
      </div>)}
      {(CPUData.hasData) && <div>System Uptime: {CPUData.mostRecentResult.uptime}</div>}
    </>
  );
}

export default App;