import React, { useState } from 'react';

import './App.css';

// chart library
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Legend
} from 'recharts'

// useSocket hook
import useSocket from './utils/useSocket';

// mui material components
import 
{ 
  AppBar, 
  Grid, 
  Toolbar, 
  Box, 
  Button, 
  Stack,
  Menu,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  TextField
} from '@mui/material';

// My battery status component
import BatteryStatus from './BatteryStatus';

function App() {

  const [pollingAnchorEl, setPollingAnchorEl] = useState(null);
  const [pointHistory, setPointHistory] = useState(20);

  const handlePollingMenuOpen = (event) => setPollingAnchorEl(event.currentTarget)
  const handlePollingMenuClose = () => setPollingAnchorEl(null)
  const handlePollingHistory = (e, newAlignment) => setPointHistory(newAlignment)

  const sysData = useSocket({ key: 'Sys', trackHistory: true, points: pointHistory });

  return (sysData.hasData &&
    <>
      <Box sx={{ flexGrow: 1, marginBottom: '25px' }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box>
              <BatteryStatus />
            </Box>

            <Box display='flex' justifyContent='end' alignItems='flex-end' >
              <Button 
                sx={{ color: '#FFFFFF', borderColor: '#FFFFFF', '&:hover' : { borderColor: '#FFFFFF' }}}
                variant="outlined"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handlePollingMenuOpen}
              >
                Polling
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={pollingAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: '',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'middle',
                }}
                open={Boolean(pollingAnchorEl)}
                onClose={handlePollingMenuClose}
              >
                <Stack spacing={3} direction="column">
                  <Stack spacing={2} direction="row" sx={{ paddingLeft: '5px', paddingRight: '5px'}}>
                    <Typography variant='h5' color='info'>
                      Points: 
                    </Typography>
                    <ToggleButtonGroup 
                      color='info'
                      value={pointHistory}
                      exclusive
                      onChange={handlePollingHistory}
                      aria-label="Polling-History"
                    >
                      <ToggleButton value={20}>20</ToggleButton>
                      <ToggleButton value={50}>50</ToggleButton>
                      <ToggleButton value={100}>100</ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                  <Stack direction="row">
                    <TextField id="polling-time-input" label="Polling Time (ms)" variant="outlined" />
                    <Button size='large' variant='outlined' onClick={(e) => { /* handle click polling API call */ }}>
                      Set
                    </Button>
                  </Stack>
                </Stack>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box>
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
      </Box>
    </>
  );
}

export default App;