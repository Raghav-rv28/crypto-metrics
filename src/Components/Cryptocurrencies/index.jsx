import React from 'react'
import {Box,Typography} from '@mui/material';
import DataGridMine from '../Common/DataGridMine';
const Cryptocurrencies = () => {

  return (
    <Box  sx={{ height: '80vh', width: '80vw'}} >
      <Typography textAlign="center" variant='h2' component='h2'>
        Cryptocurrencies
      </Typography>
      <DataGridMine />
    </Box>
  )
}

export default Cryptocurrencies