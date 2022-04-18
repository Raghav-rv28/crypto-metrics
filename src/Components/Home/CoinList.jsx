import React, { useState, useEffect, useRef}  from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const CoinList = (props) => {
    const coinsData = (props.newest && (props.data?.newestCoins || props.data?.bestCoins)) ? props.data?.newestCoins : props.data?.bestCoins

  return (
    <Paper elevation={3}>
    <Typography pt={2} variant="h5" component="h5">
        <LocalFireDepartmentIcon  sx={{ marginX: 1.3,marginTop:1,color: "#ff0000" }}/>{props.title}
    </Typography>
    <List sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}>
      <ListItem sx={{maxHeight: 24}} >
          <img className="coin-logo" src={coinsData[0]?.iconUrl} alt="" />
          <ListItemText sx={{marginLeft: 2}} primary={coinsData[0]?.name} />
      </ListItem>
      <ListItem>
          <img className="coin-logo" src={coinsData[1]?.iconUrl} alt="" />
          <ListItemText sx={{marginLeft: 2}} primary={coinsData[1]?.name} />
      </ListItem>
      <ListItem>
          <img className="coin-logo" src={coinsData[2]?.iconUrl} alt="" />
          <ListItemText sx={{marginLeft: 2}} primary={coinsData[1]?.name} />
      </ListItem>
    </List>
    </Paper>
  )
}

export default CoinList