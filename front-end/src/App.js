import React, { useState, useEffect } from 'react';

import './App.css';

import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis } from 'recharts'

const socket = io(`${process.env.CONNECT_STRING}`, {
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

    // return () => {
      // socket.off('connect');
      // socket.off('disconnect');
      // socket.off('CPUPercent');
    // };
  }, []);

  return (
    <LineChart
      width={500} 
      height={300} 
      data={cpuUsage} 
    >
      <XAxis range={[0, 1]} key='percent' />
      <YAxis key='time' />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
    </ LineChart>
  );
}

export default App;