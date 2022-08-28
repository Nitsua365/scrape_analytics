import React from 'react'

import { Box, LinearProgress } from '@mui/material'

import useSocket from './utils/useSocket'

function BatteryStatus() {

  const data = useSocket({ key: 'UPS', trackHistory: false })

  return (
    <>
      {data.hasData ? (
        <div style={{ paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100px', mr: 1 }}>
              <LinearProgress color='success' variant='determinate' value={data.mostRecentResult.batteryLvl} sx={{ height : '10px' }} /> 
            </Box>
            <Box sx={{ minWidth: 20 }}>
              <div>
                {`${data.mostRecentResult.batteryLvl} %`}
              </div>
            </Box>
          </Box>
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