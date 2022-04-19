import React , {useState,useEffect} from 'react';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import { useGetCryptosQuery, useGetGlobalStatsQuery  } from '../../services/cryptoAPI';

import CoinList from './CoinList'
import './index.scss'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import millify from 'millify';
import MultiCarousel from '../Common/MultiCarousel.jsx'



export default function Home() {
  const {data, isLoading: isLoadingCoins, isFetching: isFetchingCoins,error} = useGetCryptosQuery();
  const {data: statsData, isLoading: isLoadingStats, isFetching:isFetchingStats} = useGetGlobalStatsQuery();
  
  const coinsData = data?.data

  const columns = [
    {field:'rank' , headerName: 'Rank #',type: "number"},
    {field:'name' , headerName: 'Name',width: 250},
    {field:'price' , headerName: 'Price',width: 150,valueFormatter: (params) => { return `${params.value ? parseFloat(params.value).toFixed(2) : 0 }`}},
    {field:'marketCap' , headerName: 'Market Cap',width: 150, type: "number" ,valueFormatter: (params) => { return `${millify(params.value ? parseInt(params.value) : 0,{precision: 2})}`}},
    {field:'24hVolume' , headerName: '24 Hour Volume',width: 150,valueFormatter: (params) => { return `${millify(params.value ? parseInt(params.value) : 0,{precision: 2})}`}}
  ]
  if (isLoadingCoins && isFetchingCoins && isLoadingStats && isFetchingStats) return <>Hello</>
  if(error) {console.log(error)}

  return (
     <div className="home">
      <Grid >
        <Grid item mb={3} ml={5}> 
          <MultiCarousel/>
        </Grid>
        <Grid item container columnSpacing={1} direction="row" justifyContent="center" alignItems="center">
            {statsData?.data?.bestCoins && <Grid item xs={6} md={3}><CoinList  data = {statsData?.data} title = {"Latest Cryptocurrencies"} isLoading latest/></Grid>}
            {statsData?.data?.bestCoins && <Grid item xs={6} md={3}><CoinList  data = {statsData?.data} title = {"Trending Cryptocurrencies"} isLoading /></Grid>}
        </Grid>
        <Grid item>
          <Box sx={{ml: '20vw', marginTop: '3rem', width:'60vw',height: '75vw'}}>
              <DataGrid 
                  columns={columns}
                  rows={coinsData?.coins?.map( (coin)  => (
                          {id: coin?.uuid, ...coin}
                        ))}
              />
          </Box>  
        </Grid>
      </Grid>
    </div>
  )
}