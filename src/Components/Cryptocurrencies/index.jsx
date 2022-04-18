import React, { useState} from 'react'
import millify from 'millify';
import {Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useGetCryptosQuery  } from '../../services/cryptoAPI';
const Cryptocurrencies = () => {

  const {data, isFetching,isLoading,error} = useGetCryptosQuery();
  const coinsData= data?.data?.coins

  const columns = [
    {field:'rank' , headerName: 'Rank #',type: "number"},
    {field:'name' , headerName: 'Name',width: 250},
    {field:'price' , headerName: 'Price',width: 150,valueFormatter: (params) => { return `${params.value ? parseFloat(params.value).toFixed(2) : 0 }`}},
    {field:'marketCap' , headerName: 'Market Cap',width: 150, type: "number" ,valueFormatter: (params) => { return `${millify(params.value ? parseInt(params.value) : 0,{precision: 2})}`}},
    {field:'24hVolume' , headerName: '24 Hour Volume',width: 150,valueFormatter: (params) => { return `${millify(params.value ? parseInt(params.value) : 0,{precision: 2})}`}}

  ]

  if(isLoading && isFetching) return <div>Loading</div>
  if(error) {console.log(error)}
  
  return (
    <Box
      sx={{
        height: '80vh',
        width: '80vw'
      }}
    >
      <DataGrid sx={{ mt: '10vh',ml: '20vw' }}
        columns={columns}
        rows={          coinsData?.map( (coin)  => (
                              {id: coin?.uuid, ...coin}
                  ))}

      />
    </Box>
  )
}

export default Cryptocurrencies