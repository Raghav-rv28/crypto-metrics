import React from 'react'
import {Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import { Box, filledInputClasses, Typography } from '@mui/material'
import { useGetCoinStatsQuery, useGetCoinHistoryQuery } from '../../services/cryptoAPI';
import { borderColor } from '@mui/system';


const LineChart = ({ coinId, currentPrice, coinName}) => {
  Chart.register(...registerables);
  const {data: coinHistory, isLoading: isLoadingHistory, isFetching: isFetchingHistory} = useGetCoinHistoryQuery( {coinId})
  
  if(isLoadingHistory && isFetchingHistory) return <>Loading Chart</>
  const coinPrice = [];
  const coinTimestamp = [];
  
  for (let i =0; i < coinHistory?.data?.history?.length; i++){
    coinPrice.push(parseFloat(coinHistory?.data?.history[i]?.price))
  }
  for (let i =0; i < coinHistory?.data?.history?.length; i++){
    let d = new Date(0)
    d.setUTCSeconds(coinHistory?.data?.history[i]?.timestamp)
    coinTimestamp.push(d.toLocaleTimeString()); 
  }
   console.log(coinPrice, coinTimestamp)
   
   const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#ce93d8',
        borderColor: '#ce93d8',
      },
    ],
  };

  const options = {
    scales: {
      x:{
        ticks: {
          color: 'black'
        }
      },
      y:{
        ticks: {
          color: 'black'
        }
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ]
    },
  };
  return (
    <Box sx={{ 
    }}>
        <Typography variant='h3' textAlign='center' component='h3'>
            {coinName} Chart
        </Typography>
        <Typography variant='body1' textAlign='center' component='h6'>
            Change ( % ): {coinHistory?.data?.change} %<br/> Current price ( $ ): {currentPrice}
        </Typography>
        <Line data={data} options={options} />
    </Box>
  )
}

export default LineChart