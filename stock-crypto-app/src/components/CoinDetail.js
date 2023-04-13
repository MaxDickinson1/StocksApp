import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import './Cryptocurrency.css';

const CoinDetail = () => {
  const [coin, setCoin] = useState(null);
  const [prices, setPrices] = useState([]);
  const chartRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`,

      };

      try {
        const response = await axios.request(options);
        setCoin(response.data);
        setPrices(response.data.prices.map((price) => price[1]));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoin();
  }, [id]);

  useEffect(() => {
    if (coin && chartRef.current) {
      const context = chartRef.current.getContext('2d');

      if (context) {
        const labels = prices.map((price, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (prices.length - index));
          return date;
        });

        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        const newChart = new Chart(context, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: `${coin.name} Price`,
                data: prices,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
              {
                label: 'Current Price',
                data: new Array(prices.length).fill(coin.market_data.current_price.usd),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
              y: {
                ticks: {
                  callback: (value, index, values) => {
                    return '$' + value.toLocaleString();
                  },
                },
              },
            },
          },
        });

        chartRef.current.chart = newChart;
      }
    }
  }, [coin, prices, chartRef]);

  return (
    <div className="coin-detail">
      <h1>{coin ? coin.name : 'Loading...'}</h1>
      {coin && (
        <div className="coin-detail-content">
          <div className="coin-detail-chart">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="coin-detail-info">
          <div className="coin-detail-info-row">
  <div className="coin-detail-info-label">Symbol:</div>
  <div className="coin-detail-info-value">{coin && coin.symbol && coin.symbol.toUpperCase()}</div>
</div>

            <div className="coin-detail-info-row">
              <div className="coin-detail-info-label">Current Price:</div>
              <div className="coin-detail-info-value">${coin.market_data.current_price.usd.toLocaleString()}</div>
            </div>
            <div className="coin-detail-info-row">
              <div className="coin-detail-info-label">24 Hour Change:</div>
              <div className={`coin-detail-info-value ${coin.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
            <div className="coin-detail-info-row">
              <div className="coin-detail-info-label">Market Cap:</div>
              <div className="coin-detail-info-value">${coin.market_data.market_cap.usd.toLocaleString()}</div>
            </div>
            <div className="coin-detail-info-row">
              <div className="coin-detail-info-label">Total Volume:</div>
              <div className="coin-detail-info-value">${coin.market_data.total_volume.usd.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
      {coin && (
        <div className="coin-detail-description">
          <h2>Description</h2>
          <p>{coin.description.en}</p>
        </div>
      )}
    </div>
  );
};

export default CoinDetail;







