import { Paper,Grid , Stack,Box, Typography } from '@mui/material';
import React,{ useState, useEffect} from 'react';
import Link from '@mui/material/Link';
import { useParams } from 'react-router-dom';
import  HTMLReactParser from 'html-react-parser'; 
import Divider from '@mui/material/Divider';
import { useGetCoinStatsQuery } from '../../services/cryptoAPI';
import { styled } from '@mui/material/styles';
import { nanoid } from 'nanoid'; 
import {millify} from 'millify';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import StoreIcon from '@mui/icons-material/Store';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LineChart from './LineChart';
import BounceLoader from 'react-spinners/ClipLoader';
import { css } from "@emotion/react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

const override = css`
display: block;
margin: auto auto;
border-color: red;
`;


const Columns = (props) =>{ 
  return (
    <Item>
    <Stack divider={<Divider orientation="vertical" flexItem />} direction="row" spacing={3}>
        {props.icon}
        <Typography sx = {{minWidth: '12vw' }}>
          {props.title}
        </Typography>
        <Typography sx={{ textAlign: 'start', color: "secondary" }}>
          {props.value} 
        </Typography>
        </Stack>
  </Item>
  )
}

const Cryptodetails = () => {
  const {coinId} = useParams()
  const [timeperiod, setTimePeriod] = useState('24h')
  const {data, isLoading, isFetching} = useGetCoinStatsQuery(coinId)

  const availTime = ['3h','24h','7d','30d','1y','3m','3y','5y'];
  
  if(isLoading && isFetching) return <BounceLoader css={override} size={100} color={'#111'} isLoading/>
  
  const stats = [
    { title: 'Price to USD', value: `$ ${data?.data?.coin?.price && millify(data?.data?.coin?.price || 0)}`, icon: <MonetizationOnIcon color="secondary"/> },
    { title: 'Rank', value: data?.data?.coin?.rank, icon: <NumbersIcon  color="secondary"  /> },
    { title: '24h Volume', value: `$ ${data?.data?.coin?.supply?.total && millify(data?.data?.coin?.supply?.total || 0)}`, icon: <InvertColorsIcon  color="secondary" /> },
    { title: 'Market Cap', value: `$ ${data?.data?.coin?.marketCap && millify(data?.data?.coin?.marketCap || 0)}`, icon: <StoreIcon  color="secondary" /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(data?.data?.coin?.allTimeHigh.price || 0)}`, icon: <EmojiEventsIcon  color="secondary" /> },
    { title: 'Number Of Markets', value: `${data?.data?.coin?.numberOfMarkets|| 'nothing'}`, icon: <StorefrontIcon  color="secondary" /> },
    { title: 'Number Of Exchanges', value: `${data?.data?.coin?.numberOfExchanges || 'nothing'}`, icon: <CurrencyBitcoinIcon  color="secondary" /> },
    { title: 'Approved Supply',  value: data?.data?.coin?.supply?.confirmed ? <CheckIcon color="secondary" /> : <DangerousIcon color="secondary" />, icon: <ErrorIcon color="secondary" /> },
    { title: 'Total Supply', value: `$ ${millify(data?.data?.coin?.supply?.total || 0)}`, icon: <ErrorIcon  color="secondary" /> },
  ];
  

  return (
    <div className="crypto-detail-page">
      <Typography variant="h1" component="h2" color= "secondary" textAlign="center">
            <img className= 'coin-logo' src={data?.data?.coin?.iconUrl} alt={data?.data?.coin?.name} />{`${data?.data?.coin?.name}`}
      </Typography>
      <Grid container mt={3}>
        <Grid item sm={3.5} ml={5}>
          <Paper elevation={5}>
            <Typography variant="h4" color="secondary" component="h4"sx={{ textAlign:"center", marginY:3,paddingTop: 3 }}>
              {data?.data?.coin?.name} Value Statistics
            </Typography>
            <Stack direction="column" spacing={1}>
                {stats?.map( ({title, value ,icon}) =>{
                  return (<Columns key={nanoid()} title={title} value={value} icon={icon} />)
                })}
          </Stack>
          </Paper>
          </Grid>
          <Grid item sm={7} ml={10}>
                <LineChart coinId = {coinId} timeperiod={timeperiod} currentPrice={millify(data?.data?.coin?.price || 0)} coinName={data?.data?.coin?.name}/>
          </Grid>
      { data?.data?.coin?.description &&  <Grid item sm = {4} ml={5}>
            <Paper elevation={3} mb={5}>
              <Typography variant="h3" component="h3" color= "secondary" paddingTop={4} sx={{ marginTop: 5,textAlign: "center"}}>
                {data?.data?.coin?.name} Description
              </Typography>
            <Typography>
            {HTMLReactParser(data?.data?.coin?.description)}
            </Typography>
            </Paper>
          </Grid>}
         {data?.data?.coin?.links && <Grid item sm={4} ml={5}>
                <Paper elevation={3}>
              <Typography variant="h3" component="h3" color= "secondary" paddingTop={4} sx={{ marginTop: 5,textAlign: "center"}}>
              {data?.data?.coin?.name} Links
                  </Typography>
                  <Stack direction="row" flexWrap={'wrap'} spacing={3}>
                      {data?.data?.coin?.links?.map( (link)=>{
                          return (
                              <Box key={nanoid()} >
                                  <Typography>{link?.type} </Typography>
                                  <Link href={link?.url}>
                                    <Typography>{link?.name} </Typography>
                                  </Link>
                              </Box>
                          )
                      })}
                  </Stack>
                </Paper>
          </Grid>}
      </Grid>
    </div>
  )
}

export default Cryptodetails