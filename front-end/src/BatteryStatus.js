import React from 'react'

import { Box, LinearProgress } from '@mui/material'

import useSocket from './utils/useSocket'

function BatteryStatus() {

  const data = useSocket({ key: 'UPS', trackHistory: false })

  return (
    <>
      {data.hasData ? (
        <div style={{ paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px' }}>
          <Box>
            <LinearProgress color='success' sx={{ maxWidth: 100, height: '10px' }} variant='determinate' value={data.mostRecentResult.batteryLvl} />
          </Box>
          <div>
            Battery: {data.mostRecentResult.batteryLvl} %
          </div>
          <div>
            Load(W): {data.mostRecentResult.load.wattage}
          </div>
          <div>
            Load(%): {data.mostRecentResult.load.percent} %
          </div>
        </div>
      ) : (
        <div>
          Loading...
        </div>
      )}
    </>
  )
}

export default BatteryStatus;