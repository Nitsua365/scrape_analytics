import React from 'react';

import './App.css';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Label
} from 'recharts'

import useSocket from './utils/useSocket';
import Toolbar from './Toolbar';

function App() {

  const batteryData = useSocket('UPS')
  const CPUData = useSocket('CPU');

  return ( CPUData.hasData &&
    <>
      <Toolbar data={batteryData} />
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
    </>
  );
}

export default App;