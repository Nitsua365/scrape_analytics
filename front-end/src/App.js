import React from 'react';

import './App.css';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Label,
  Legend
} from 'recharts'

import useSocket from './utils/useSocket';
import { AppBar, Grid, Toolbar, Box, IconButton, styled, Typography } from '@mui/material';
import MenuIcon from '@mui/material/Menu'
import BatteryStatus from './BatteryStatus';

function App() {

  const sysData = useSocket({ key: 'Sys', trackHistory : true, points: 100 });

  return (sysData.hasData &&
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' color='info' sx={{ marginBottom: '20px' }}>
          <Toolbar>
            <Box 
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <BatteryStatus />
            </Box>
            
            {/* <IconButton
              size="large"
              aria-label="display more actions"
              edge="end" 
              color='inherit'
            > */}
              <MenuIcon />
            {/* </IconButton> */}
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <Grid container rowSpacing={8} columnSpacing={4}>
          <Grid item xs={6}>
            <LineChart
              width={700} 
              height={300} 
              data={sysData.data}
            >
              {(sysData.hasData) ? 
              (
                <>
                  <XAxis dataKey='time'>
                    <Label value="Time" position="bottom" offset={-10} />
                  </XAxis>
                  <YAxis dataKey="cpuCurrentSpeed.percent" label={{ value: 'CPU Percent %', angle: -90, position: 'centerLeft' }} />
                  <Line type="monotone" dataKey="cpuCurrentSpeed.percent" stroke="#006eff" animationDuration={400} />
                </>
              ) : (
                <>
                  <div>
                    Loading...
                  </div>
                </>
              )}
            </ LineChart>
          </Grid>
          <Grid item xs={6}>
            <LineChart
              width={700}
              height={300}
              data={sysData.data}
            >
              <XAxis dataKey='time'>
                <Label value="Time" position="bottom" offset={-10} />
              </XAxis>
              <YAxis label={{ value: 'CPU Temperature (C)', angle: -90, position: 'centerLeft' }} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" name="main" dataKey="cpuTemperature.main" stroke="#006eff" animationDuration={400} />
              <Line type="monotone" name="Core 1" dataKey="cpuTemperature.cores[0]" stroke="#ff0000" animationDuration={400} />
              <Line type="monotone" name="Core 2" dataKey="cpuTemperature.cores[1]" stroke="#00ff00" animationDuration={400} />
              <Line type="monotone" name="Core 3" dataKey="cpuTemperature.cores[2]" stroke="#ffa500" animationDuration={400} />
              <Line type="monotone" name="Core 4" dataKey="cpuTemperature.cores[3]" stroke="#fff714" animationDuration={400} />
            </LineChart>
          </Grid>
          <Grid item xs={6}>
            <LineChart
              width={700}
              height={300}
              data={sysData.data}
            >
              <XAxis dataKey='time'>
                <Label value="Time" position="bottom" offset={-10} />
              </XAxis>
              <YAxis label={{ value: 'CPU Speed (GHz)', angle: -90, position: 'centerLeft' }} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" name="main" dataKey="cpuCurrentSpeed.main" stroke="#006eff" animationDuration={400} />
              <Line type="monotone" name="Core 1" dataKey="cpuCurrentSpeed.cores[0]" stroke="#ff0000" animationDuration={400} />
              <Line type="monotone" name="Core 2" dataKey="cpuCurrentSpeed.cores[1]" stroke="#00ff00" animationDuration={400} />
              <Line type="monotone" name="Core 3" dataKey="cpuCurrentSpeed.cores[2]" stroke="#ffa500" animationDuration={400} />
              <Line type="monotone" name="Core 4" dataKey="cpuCurrentSpeed.cores[3]" stroke="#fff714" animationDuration={400} />
              <Line type="monotone" name="Core 5" dataKey="cpuCurrentSpeed.cores[4]" stroke="#6a0dad" animationDuration={400} />
              <Line type="monotone" name="Core 6" dataKey="cpuCurrentSpeed.cores[5]" stroke="#36daf0" animationDuration={400} />
              <Line type="monotone" name="Core 7" dataKey="cpuCurrentSpeed.cores[6]" stroke="#964B00" animationDuration={400} />
              <Line type="monotone" name="Core 8" dataKey="cpuCurrentSpeed.cores[7]" stroke="#d210d3" animationDuration={400} />
            </LineChart>
          </Grid>
          <Grid item xs={5}>
            <LineChart
              width={700}
              height={300}
              data={sysData.data}
            >
              <XAxis dataKey='time'>
                <Label value="Time" position="bottom" offset={-10} />
              </XAxis>
              <YAxis offset={-10} label={{ value: 'Memory (MB)', angle: -90, position: 'centerLeft' }} />
              <Legend verticalAlign="top" />
              <Line type="monotone" name="Available" dataKey="mem.available" stroke="#006eff" animationDuration={400} />
              <Line type="monotone" name="Free" dataKey="mem.free" stroke="#ff0000" animationDuration={400} />
              <Line type="monotone" name="Active" dataKey="mem.active" stroke="#00ff00" animationDuration={400} />
              <Line type="monotone" name="Used" dataKey="mem.used" stroke="#ffa500" animationDuration={400} />
            </LineChart>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;