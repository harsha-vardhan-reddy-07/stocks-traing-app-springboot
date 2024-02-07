import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import {BiSearch} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'

const Home = () => { 

  const [trendingStocks, setTrendingStocks] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    fetchTrending();
    fetchAllStocks();
  }, [])


  // Trending (top 25) stocks
  const fetchTrending = async () =>{
    
    const optionsTrending = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/co/collections/most_actives',
      params: {start: '0'},
      headers: {
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
      }
    };
  try {
    const response = await axios.request(optionsTrending);
    console.log(response.data);
    setTrendingStocks(response.data.body);
  } catch (error) {
    console.error(error);
  }
}

// All the available stocks
const fetchAllStocks = async () =>{  
  const optionsAll = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/stocks',
    params: {
      exchange: 'NASDAQ',
      format: 'json'
    },
    headers: {
      'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
      'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(optionsAll);
    setAllStocks(response.data.data);
  } catch (error) {
    console.error(error);
  }
}



  return (
    <>
    <div className="homePage">

      <div className="trending-stocks-container">
          <h2>Trending stocks</h2>

          <div className="trending-stocks">

          {trendingStocks ?
            <>
            {trendingStocks.length === 0 && <div className="loading-spinner"> </div>}
            {trendingStocks.map((stock)=>{
            return(

                <div className="trending-stock" key={stock.symbol} onClick={()=> navigate(`/stock/${stock.symbol}`)}>
                  <span>
                    <h5>Stock name</h5>
                    <p>{stock.shortName}</p>
                  </span>
                  <span>
                    <h5>Symbol</h5>
                    <p>{stock.symbol}</p>
                  </span>
                  <span>
                    <h5>Price</h5>
                    <p style={stock.regularMarketChangePercent > 0 ? {color: "green"} : {color: "red"}} >$ {stock.regularMarketOpen} ({stock.regularMarketChangePercent.toFixed(2)}%)</p>
                  </span>

                </div>

            )
          })}
            </>
          
          :
          ""}


          

          </div>
      </div>

      <div className="all-stocks-container">

          <div className="all-stocks-container-head">
            <h2>Watchlist</h2>
            <div className="all-stocks-container-search">
              <input type="text" placeholder='Enter Stock Symbol....' onChange={(e)=> setSearch(e.target.value)} />
              <BiSearch id='searchIcon' />
            </div>
          </div>

          <div className="all-stocks">

          {allStocks.length === 0 && <div className="loading-spinner"> </div>}
          

          {search === '' ?
          
          <>
            {allStocks.map((stock)=>{
            return(

              <div className="all-stocks-stock" key={stock.symbol}>
                  <h6>{stock.exchange}</h6>
                <span>
                  <h5>Stock name</h5>
                  <p>{stock.name}</p>
                </span>
                <span>
                  <h5>Symbol</h5>
                  <p>{stock.symbol}</p>
                </span>
                <span>
                  <h5>Stock Type</h5>
                  <p>{stock.type}</p>
                </span>
                <button className='btn btn-primary' onClick={()=> navigate(`/stock/${stock.symbol}`)}>View Chart</button>
              </div>
            )
          })}
          </>
          
          :
          
          <>
            {allStocks.filter(stock=> stock.symbol.includes(search) || stock.name.includes(search)).map((stock)=>{
            return(

              <div className="all-stocks-stock" key={stock.symbol}>
                  <h6>{stock.exchange}</h6>
                <span>
                  <h5>Stock name</h5>
                  <p>{stock.name}</p>
                </span>
                <span>
                  <h5>Symbol</h5>
                  <p>{stock.symbol}</p>
                </span>
                <span>
                  <h5>Stock Type</h5>
                  <p>{stock.type}</p>
                </span>
                <button className='btn btn-primary' onClick={()=> navigate(`/stock/${stock.symbol}`)}>View Chart</button>
              </div>
            )
          })}
          </>}


          

          </div>
      </div>

    </div>
    </>
  )
}

export default Home