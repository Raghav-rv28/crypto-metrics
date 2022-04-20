import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import millify from 'millify'
import { useGetCryptosQuery } from '../../services/cryptoAPI';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Sparklines } from 'react-sparklines';
const DataGridMine = () => {

    const {data, isFetching,isLoading,error} = useGetCryptosQuery();
    const coinsData= data?.data?.coins
    const columns = [
        {field:'rank' , headerName: 'Rank #',type: "number"},
        {field:'name' , headerName: 'Name',width: 350,renderCell: (cellValues)=>{
          return (
            <NavLink to={`/crypto/${cellValues.row.uuid}`}>
            <Typography sx={{ textDecoration: 'none', fontSize: 'inherit' }}>
              <img className="coin-logo" src={cellValues.row.iconUrl} alt="logo"/>{`${cellValues.row.symbol}\t\t${cellValues.row.name}`}
            </Typography>
            </NavLink>
          )
        }},
        {field: 'change', headerName: 'change (24H)',width: 150, renderCell: (cellValues)=>{
            return (
              <Typography sx={{ color: cellValues.row.change > 0 ? "#00FF00" : "#FF0000" ,fontSize: 'inherit' }}>
                    {`${cellValues.row.change > 0 ? "^" : "⌄"}\t${cellValues.row.change}\t%`}
              </Typography>
            )
        }},
        {field:'price' , headerName: 'Price',width: 150,valueFormatter: (params) => { return `$\t${params.value ? parseFloat(params.value).toFixed(2) : 0 }`}},

        {field:'marketCap' , headerName: 'Market Cap',width: 150, type: "number" ,valueFormatter: (params) => { return `$\t${millify(params.value ? parseInt(params.value) : 0,{precision: 2})}`}},
        {field:'24hVolume' , headerName: '24 Hour Volume',width: 150,valueFormatter: (params) => { return `${millify(params.value ? parseInt(params.value) : 0,{precision: 2})}`}},
        {field: 'sparkline',headerName: 'Last 24 Hours',width: 200, renderCell: (cellValues) =>{
          let stringArray = cellValues.row.sparkline
          let numberArray = [];
          for (let i = 0; i < stringArray.length; i++)
            numberArray.push(parseFloat(stringArray[i]))
          return(
            <Sparklines data = {numberArray} limit={10} svgWidth = {180} svgHeight={50} />
          )
        }}
      ]

      if(isLoading && isFetching) return <div>Loading</div>
      if(error) {console.log(error)}
  return (
        <DataGrid sx={{
           mt: '10vh',ml: '20vw', fontSize: '1rem',
          backgroundColor: "primary"
          //  '& .MuiDataGrid-cell:hover': {
          //   color: 'primary.main',
          // },
          }}
            columns={columns}
            rows={  coinsData?.map( (coin)  => (
                            {id: coin?.uuid, ...coin}
                    ))}/>
  )
}

export default DataGridMine