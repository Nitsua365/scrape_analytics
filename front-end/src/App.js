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

import useSocket from './utils/useSocket';

const socket = io(`${process.env.REACT_APP_CONNECT_STRING}`, {
  transports: ['websocket', 'polling']
})

function App() {

  const { isConnected, data } = useSocket(socket, 'CPUPercent');

  return ( data.length &&
    <>
      <div>
        <LineChart
          width={700} 
          height={300} 
          data={data}
        >
          {(isConnected) ? 
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
      {(data.length) && <div>System Uptime: {data[data.length - 1].uptime}</div>}
    </>
  );
}

export default App;