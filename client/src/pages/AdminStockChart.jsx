import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts'
import '../styles/AdminStockChart.css';

const AdminStockChart = () => {


  const {id} = useParams();
  const [stockValues, setStockValues] = useState([]);
  const [stockExchange, setStockExchange] = useState('');

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

  
  


  useEffect(()=>{
    fetchStockData();
  },[])



  const fetchStockData = async()=>{
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

  return (
    <div className="adminStockPage">

      <div className="adminStockChart">
        <Chart options={options} series={series} type="candlestick" height="100%" />
        
      </div>
    </div>
  )
}

export default AdminStockChart