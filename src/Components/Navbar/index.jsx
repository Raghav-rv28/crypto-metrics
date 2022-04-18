import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import {nanoid} from 'nanoid'
import { useGetCryptosQuery } from '../../services/cryptoAPI';
import './index.scss'
import millify from 'millify';

const SearchAppBar = () => {  
  const {data, isLoading,isFetching,error} = useGetCryptosQuery();
  const globalStats = data?.data?.stats;

  const tickersHeadings = [
    `Total Coins: ${globalStats?.totalCoins.toLocaleString()}`,
    `Total Exchanges: ${globalStats?.totalExchanges}`,
    `Total Markets: ${globalStats?.totalMarkets.toLocaleString()}`,
    `Total 24h Volume: ${millify(globalStats?.total24hVolume ? globalStats?.total24hVolume : 0,{precision: 2})}`,
    `Total MarketCap: ${millify(globalStats?.totalMarketCap ? globalStats?.totalMarketCap : 0,{precision: 2})}`,
    `BTC Dominance: ${globalStats?.btcDominance.toFixed(2)}` 
  ]

    const Ticker = (props) =>{
      return (
        <div className="ticker__item">{props.heading}
          </div>)
  }


  const [PageTitle,setPageTitle] = React.useState("CryptoMetrics");
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (value ) => {
    setPageTitle(value)
    setAnchorEl(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  if(isLoading && isFetching) return <>Loading</>
  if(error) {console.log(error)}
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {PageTitle}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div>
              <IconButton
                size="large"
                aria-label="Collasped Menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 2 }}
              >
              <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={()=>{handleClose("CryptoMetrics")}}
              >
                <NavLink to='/'>
                  <MenuItem onClick={()=>{handleClose("CryptoMetrics")}}>Home</MenuItem>
                </NavLink>
                <NavLink to='/Cryptocurrencies'>
                <MenuItem onClick={()=>{handleClose("Cryptocurrencies")}}>Cryptocurrencies</MenuItem>
                </NavLink>
                <NavLink to='/News'>
                <MenuItem onClick={()=>{handleClose("News")}}>News</MenuItem>
                </NavLink>
              </Menu>
            </div>
        </Toolbar>
        <Box className="ticker-wrap" sx={{ flexGrow: 1 }}>
        <div className="ticker">
              {tickersHeadings.map( (heading)=>{
                return <Ticker key={nanoid()} heading ={heading}/>
              })}
        </div>
        </Box>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;
