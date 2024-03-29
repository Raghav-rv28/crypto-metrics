import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Exchanges from './Components/Exchanges';
import Home from './Components/Home';
import PrimarySearchAppBar from './Components/Navbar';
import News from './Components/News';
import Cryptocurrencies from './Components/Cryptocurrencies';
import Cryptodetails from './Components/Cryptodetails';
import { createMuiTheme, ThemeProvider } from '@mui/material';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const theme = createMuiTheme({
  
})
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element = { <Home />} />
        <Route path='Exchanges' element={<Exchanges/>} />
        <Route path='Cryptocurrencies' element={<Cryptocurrencies/>} />
        <Route path='crypto/:coinId' element={<Cryptodetails/>} />
        <Route path='News' element={<News/>} />
    </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
