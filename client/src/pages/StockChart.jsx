import React, { useEffect, useState } from 'react'
import '../styles/StockChart.css'
import Chart from 'react-apexcharts'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const StockChart = () => {

  const [stockAction, setStockAction] = useState('buy');

  const {id} = useParams();
  const [stockValues, setStockValues] = useState([]);
  const [stockPrice, setStockPrice] = useState();
  const [stockExchange, setStockExchange] = useState('');

  const [buyQuantity, setBuyQuantity] = useState(0);
  const [buyType, setBuyType] = useState('Intraday');
  const [sellQuantity, setSellQuantity] = useState(0);
  const [sellType, setSellType] = useState('Intraday');


  const transformAndAppendData = apiResponse => {
    const close = parseFloat(apiResponse.close);
    const high = parseFloat(apiResponse.high);
    const low = parseFloat(apiResponse.low);
    const open = parseFloat(apiResponse.open);
  
    const datetime = new Date(apiResponse.datetime);
    const timestamp = datetime.getTime();

    const transformedObject = {
      x: timestamp,
      y: [open, high, low, close]
    };

    // Use the spread operator to append the transformed object to the state array
    setStockValues(prevData => [...prevData, transformedObject]);
  };


 
  const fetchPrice = async() =>{
    
      const optionsPrice = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/price',
        params: {
          symbol: id,
          format: 'json',
          outputsize: '30'
        },
        headers: {
          'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
      };
    try {
      const response = await axios.request(optionsPrice);
      setStockPrice( parseFloat(response.data.price));
    } catch (error) {
      console.error(error);
    }
  }
  

  useEffect(()=>{
    fetchStockData();
    fetchPrice();
  },[])



  const fetchStockData = async()=>{
    const optionsData = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/time_series',
      params: {
        symbol: id,
        interval: '1min',
        outputsize: '100',
        format: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(optionsData);
      console.log(response.data.meta);
      setStockExchange(response.data.meta.exchange);
      const apiResponses = response.data.values;
      apiResponses.forEach(apiResponse => {
        transformAndAppendData(apiResponse);
      });
    } catch (error) {
      console.error(error);
    }
  }


  const series = [{
    data: stockValues
  }]
  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: id + ' ' + stockExchange,
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }


  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();


  const buyStock = async (e)=>{
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
  params: {
    symbol: id,
    outputsize: '1'
  },
      headers: {
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    
    try {
      const res = await axios.request(options);
      await axios.post('http://localhost:6001/buyStock', {user: userId, symbol: id, name: res.data.data[0].instrument_name, stockType: buyType, stockExchange: stockExchange, price: stockPrice,  count: buyQuantity, totalPrice: stockPrice * buyQuantity}).then(
      (response)=>{
          setBuyQuantity(0);
          setBuyType(0);
          navigate('/history');
      }
    ).catch((error)=>{
      alert("Transaction failed!!");
    })
    } catch (error) {
      console.error(error);
    }
  }



  const sellStock = async (e)=>{
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
  params: {
    symbol: id,
    outputsize: '1'
  },
      headers: {
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    
    try {
      const res = await axios.request(options);
      await axios.post('http://localhost:6001/sellStock', {user: userId, symbol: id, name: res.data.data[0].instrument_name, stockType: sellType, price: stockPrice,  count: sellQuantity, totalPrice: stockPrice * sellQuantity}).then(
      (response)=>{
          setBuyQuantity(0);
          setBuyType(0);
          navigate('/history');
      }
    ).catch((error)=>{
      alert("Transaction failed!!");
    })
    } catch (error) {
      console.error(error);
    }
  }



  return (

    <div className="stockPage">

      <div className="stockChart">
        <Chart options={options} series={series} type="candlestick" height="100%" />
      </div>

      
      <div className="stockChartActions">
        <div className="stockChartActions-head">
          <button className={stockAction === 'buy' ? 'button-active' : 'button-inactive'} onClick={()=> setStockAction('buy')}>Buy {stockPrice ? ` @ $  ${stockPrice}` : ''}</button>
          <button className={stockAction === 'sell' ? 'button-active' : 'button-inactive'} onClick={()=> setStockAction('sell')}>Sell {stockPrice ? ` @ $  ${stockPrice}` : ''}</button>
        </div>

        <div className="stockChartActions-body">

          {stockAction === 'buy' ?
              <form>
              <div className="mb-3">
                <label htmlFor="inputProductType" className="form-label">Product type</label>
                <select className="form-select" id='inputProductType' aria-label="Default select example" onChange={(e)=> setBuyType(e.target.value)} value={buyType}>
                  <option value="Intraday" selected>Intraday</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputStockQuantity" className="form-label" >Quantity</label>
                <input type="number" className="form-control" id="exampleInputPassword1" onChange={(e)=>setBuyQuantity(e.target.value)} value={buyQuantity}  />
              </div>
              <div className="mb-3">
                <label htmlFor="inputStockTotalPrice" className="form-label">Total price</label>
                <input type="number" className="form-control" id="inputStockTotalPrice" disabled value={buyQuantity * stockPrice} />
              </div>
              <button className="btn btn-success" onClick={buyStock}>Buy now</button>
          </form>
      :
            <form>
                <div className="mb-3">
                  <label htmlFor="inputProductType" className="form-label">Product type</label>
                  <select className="form-select" id='inputProductType' aria-label="Default select example" onChange={(e)=> setSellType(e.target.value)} value={sellType}>
                    <option value="Intraday" selected>Intraday</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputStockQuantity" className="form-label">Quantity</label>
                  <input type="number" className="form-control" id="exampleInputPassword1" onChange={(e)=>setSellQuantity(e.target.value)} value={sellQuantity} />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputStockTotalPrice" className="form-label">Total price</label>
                  <input type="number" className="form-control" id="inputStockTotalPrice" disabled value={sellQuantity * stockPrice} />
                </div>
                <button  className="btn btn-danger" onClick={sellStock}>Sell now</button>
            </form>
          }
            
        </div>

      </div>
    </div>

  )
}

export default StockChart