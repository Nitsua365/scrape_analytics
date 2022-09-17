import React from 'react'

import { Box, LinearProgress, Typography } from '@mui/material'

import useSocket from './utils/useSocket'

function BatteryStatus() {

  const data = useSocket({ key: 'UPS', trackHistory: false })

  return (
    <>
      <Box sx={{paddingBottom: '5px', paddingTop: '5px', paddingLeft: '3px'}}>
        {data.hasData ? (
          <>
          {/* <div style={{ paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px' }}> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100px', mr: 1 }}>
                <LinearProgress color='success' variant='determinate' value={data.mostRecentResult.batteryLvl} sx={{ height: '10px', boxShadow: 1 }} />
              </Box>
              <Box sx={{ minWidth: 20 }}>
                <div>
                  {`${data.mostRecentResult.batteryLvl} %`}
                </div>
              </Box>
            </Box>

            <Typography>
              Load(W): {data.mostRecentResult.load.wattage}
            </Typography>

            <Typography>
              Load(%): {data.mostRecentResult.load.percent} %
            </Typography>
          {/* </div> */}
          </>
        ) : (
          <div>
            Loading...
          </div>
        )}
      </Box>
    </>
  )
}

export default BatteryStatus;