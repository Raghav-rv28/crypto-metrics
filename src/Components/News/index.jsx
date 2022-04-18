import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import NewsCard from './NewsCard'
import './data.json'
import './index.scss'
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery  } from '../../services/cryptoAPI';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
let news = require('./data.json')

function News({ short }) {
  const [newsType, setnewsType] = React.useState('Cryptocurrency');
  const demoImage = "https://picsum.photos/300/150"
  const {data: newsList , isLoading ,error} = useGetCryptoNewsQuery({ newsCategory: newsType, count: short ? 3 : 10});

  const {data: cryptoList, isLoading: isLoadingCoins} = useGetCryptosQuery();
  const coinsData = cryptoList?.data?.coins

  if (isLoading && isLoadingCoins) return <div>Loading News</div>
  if(error) {
    console.log(error)
  }

  const handleChange = (event) => {
    setnewsType(event.target.value);
  };

  return (
    <Container maxWidth="lg">
    <div className="news">
          {!short && <FormControl fullWidth>
            <InputLabel id="simple-select-label">Select a Crypto</InputLabel>
              <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={newsType}
                  label="Cryptocurrency"
                  onChange={handleChange}          
                  inputProps={{
                    id: "open-select"
                  }}
              >
                {coinsData?.map( (coin,i)=>(
                  <MenuItem key ={i} value={coin.name}>{coin.name}</MenuItem>
                ))}
                <MenuItem value='Bitcoin'>Bitcoin</MenuItem> 
                <MenuItem value='Ethereum'>Ethereum</MenuItem> 
                <MenuItem value='BNB'>BNB</MenuItem> 
            </Select>
                    </FormControl>}

      <Grid container spacing ={5}>

          {newsList?.value?.map( (news, i)=> (
            <NewsCard 
            key={i}
            url = {news.url}
            name = {news.name}
            description = {news.description}
            img = {news?.image?.thumbnail?.contentUrl || demoImage}
            provider = {news.provider[0]?.image?.thumbnail?.contentUrl}
            // providername = {news.provider[0]?.name}
            timestamp = {news.datePublished}
            />
            ))}
            
      </Grid>
    </div>
    </Container>
  )
}

export default News