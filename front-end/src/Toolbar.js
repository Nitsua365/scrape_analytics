import React from 'react'

import { Box, LinearProgress } from '@mui/material'

function Toolbar({ data }) {

  return (
    <>
      {data.hasData && (
        <div style={{ position: 'relative', float: 'right' }}>
          <Box>
            <LinearProgress color='success' sx={{ maxWidth: 100 }} variant='determinate' value={data.mostRecentResult.batteryLvl} />
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
      )}
    </>
  )
}

export default Toolbar;