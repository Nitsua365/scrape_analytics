import React, { useState, useEffect } from 'react';

import './App.css';

import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis } from 'recharts'

const socket = io('ws://localhost:5516', {
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
      setCpuUsage(cpu => [...cpu, cpuData])
    })

    return () => {
      // socket.off('connect');
      // socket.off('disconnect');
      socket.off('CPUPercent');
    };
  }, []);

  return (
    <LineChart
      width={500} 
      height={300} 
      data={cpuUsage} 
    >
      <XAxis />
      <YAxis key="cpu" />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
    </ LineChart>
  );
}

export default App;