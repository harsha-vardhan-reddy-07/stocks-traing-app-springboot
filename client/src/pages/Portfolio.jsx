import React, { useEffect, useState } from 'react'
import '../styles/Portfolio.css'
import {BiSearch} from 'react-icons/bi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {

  const [stocks, setStocks] = useState([]);

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();


  useEffect(()=>{
    fetchStocks();
  }, [])

  const fetchStocks = async () =>{
    await axios.get('http://localhost:6001/fetch-stocks').then(
      (response)=>{
        setStocks(response.data.reverse());
      }
    ).catch((err)=>{
      console.log(err);
    })
  }  


  return (
    <div className="portfolioPage">
      <div className="user-portfolio-container">

          <div className="user-portfolio-container-head">
            <h2>My Portfolio</h2>
            <div className="user-portfolio-container-search">
              <input type="text" placeholder='Enter Stock Symbol....' />
              <BiSearch id='searchIcon' />
            </div>
          </div>

          <div className="user-portfolio">

          {stocks.filter(stock=> stock.user === userId).map((stock)=>{
            return(
              <div className="user-portfolio-stock">
                  <h6>{stock.stockExchange}</h6>
                <span>
                  <h5>Stock name</h5>
                  <p>{stock.name}</p>
                </span>
                <span>
                  <h5>Symbol</h5>
                  <p>{stock.symbol}</p>
                </span>
                <span>
                  <h5>Stocks</h5>
                  <p>{stock.count}</p>
                </span>
                <span>
                  <h5>stock price</h5>
                  <p>$ {stock.price}</p>
                </span>
                <span>
                  <h5>Total value</h5>
                  <p>$ {stock.totalPrice}</p>
                </span>
                <button className='btn btn-primary' onClick={()=> navigate(`/stock/${stock.symbol}`)}>View Chart</button>
              </div>
            )
          })}

            



          </div>
          </div>

    </div>
  )
}

export default Portfolio