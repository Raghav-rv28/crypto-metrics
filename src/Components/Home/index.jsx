import React , {useState,useEffect} from 'react';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import { useGetCryptosQuery, useGetGlobalStatsQuery  } from '../../services/cryptoAPI';
import { Typography } from '@mui/material';
import CoinList from './CoinList'
import './index.scss'
import DataGridMine  from '../Common/DataGridMine.jsx';
import Box from '@mui/material/Box';
import millify from 'millify';
import MultiCarousel from '../Common/MultiCarousel.jsx'
import { css } from "@emotion/react";
import BounceLoader from 'react-spinners/ClipLoader';

export default function Home() {
  const {data, isLoading: isLoadingCoins, isFetching: isFetchingCoins,error} = useGetCryptosQuery();
  const {data: statsData, isLoading: isLoadingStats, isFetching:isFetchingStats} = useGetGlobalStatsQuery();
  
  const coinsData = data?.data
  
  const override = css`
  display: block;
  margin: auto auto;
  border-color: red;
`;

  const columns = [
    {field:'rank' , headerName: 'Rank #',type: "number"},
    {field:'Route' , headerName: 'Name',width: 250},
    {field:'price' , headerName: 'Price',width: 150,valueFormatter: (params) => { return `${params.value ? parseFloat(params.value).toFixed(2) : 0 }`}},
    {field:'marketCap' , headerName: 'Market Cap',width: 150, type: "number" ,valueFormatter: (params) => { return `${millify(params.value ? parseInt(params.value) : 0,{precision: 2})}`}},
    {field:'24hVolume' , headerName: '24 Hour Volume',width: 150,valueFormatter: (params) => { return `${millify(params.value ? parseInt(params.value) : 0,{precision: 2})}`}}
  ]
  if (isLoadingCoins && isFetchingCoins && isLoadingStats && isFetchingStats) return <BounceLoader css={override} size={100} color={'#111'} isLoading/>
  if(error) {console.log(error)}

  return (
     <div className="home">
      <Grid >
        <Grid item mb={3}> 
        <Typography variant="h5" component="h5" sx={{
          textAlign: 'center',
          paddingTop: '1rem'
        }}>
            { `Latest Cryptocurrency News`}
        </Typography>
          <MultiCarousel/>
        </Grid>
        <Grid item container columnSpacing={1} direction="row" justifyContent="space-evenly" alignItems="center">
            {statsData?.data?.bestCoins && <Grid item xs={6} md={2.5}><CoinList  data = {statsData?.data} title = {"Latest Cryptocurrencies"} isLoading latest/></Grid>}
            {statsData?.data?.bestCoins && <Grid item xs={6} md={2.5}><CoinList  data = {statsData?.data} title = {"Trending Cryptocurrencies"} isLoading /></Grid>}
        </Grid>
        <Grid item>
          <Box sx={{ marginTop: '3rem', width:'80vw',height: '100vh'}}>
              <DataGridMine/>
          </Box>  
        </Grid>
      </Grid>
    </div>
  )
}