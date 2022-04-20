import React, { useState, useEffect, useRef}  from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const CoinList = (props) => {
    const coinsData = (props.latest ? props.data?.newestCoins : props.data?.bestCoins)

  return (
    <Paper elevation={3} sx={{backgroundColor:'inherit'}}>
    <Typography pt={1} pb={2} variant="h5" component="h5">
       { props.latest ? <LocalFireDepartmentIcon  sx={{ marginX: 2 ,transform: 'translateY(0.3rem)',color: "#ff0000"}}/>: <AccessAlarmIcon  sx={{marginX: 2 ,transform: 'translateY(0.3rem)',color: "#ff0000", color: "purple" }}/>}
       {props.title}
    </Typography>
    <List sx={{ width: '100%', maxWidth: 240, ml:3 }}>
      <ListItem sx={{maxHeight: 36}} >
          <img className="coin-logo" src={coinsData[0]?.iconUrl} alt="" />
          
          <ListItemText sx={{marginLeft: 2}} primary={coinsData[0]?.name} secondary={coinsData[0]?.symbol} />
      </ListItem>
      <ListItem>
          <img className="coin-logo" src={coinsData[1]?.iconUrl} alt="" />
          <ListItemText sx={{marginLeft: 2}} primary={coinsData[1]?.name} secondary={coinsData[1]?.symbol}/>
      </ListItem>
      <ListItem>
          <img className="coin-logo" src={coinsData[2]?.iconUrl} alt="" />
          <ListItemText sx={{marginLeft: 2}} primary={coinsData[1]?.name} secondary={coinsData[2]?.symbol}/>
      </ListItem>
    </List>
    </Paper>
  )
}

export default CoinList