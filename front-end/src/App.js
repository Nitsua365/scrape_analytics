import React, { useState, useEffect } from 'react';

import './App.css';

import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, Label } from 'recharts'

const socket = io(`${process.env.REACT_APP_CONNECT_STRING}`, {
  transports: ['websocket', 'polling']
})

function App() {

  const [cpuUsage, setCpuUsage] = useState([]);

  useEffect(() => {
    // socket.on('connect', () => {
    //   setIsConnected(true);
    // });

    // socket.on('disconnect', () => {
    //   setIsConnected(false);
    // });

    socket.on('CPUPercent', (cpuData) => {
      console.log(cpuData)
      setCpuUsage(curr => [...curr, cpuData])
    })

    return () => {
      // socket.off('connect');
      // socket.off('disconnect');
      socket.off('CPUPercent');
    };
  }, []);

  return (
    <LineChart
      width={700} 
      height={300} 
      data={cpuUsage} 
    >
      <XAxis dataKey='time'>
        <Label value="Time" position="insideBottom" offset={-4} />
      </XAxis>
      <YAxis dataKey='percent' label={{ value: 'CPU Percent %', angle: -90, position: 'insideLeft' }} />
      <Line type="monotone" dataKey="percent" stroke="#8884d8" />
    </ LineChart>
  );
}

export default App;