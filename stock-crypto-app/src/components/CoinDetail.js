import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { coinGeckoClient } from './api';
import './Cryptocurrency.css';

const CoinDetail = () => {
  const [coin, setCoin] = useState(null);
  const [prices, setPrices] = useState([]);
  const chartRef = useRef(null);
  const { id } = useParams();

  const addToFavorites = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to add to favorites');
      return;
    }

    try {
      await axios.post(`https://stark-chamber-73716.herokuapp.com/user/${userId}/favorites/add`, {
        id: coin.id,
        name: coin.name,
      });
      alert('Added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error.message);
      alert('Error adding to favorites. Please try again.');
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const options = {
        method: 'GET',
        url: `/coins/${id}/market_chart/range`,
        params: {
          vs_currency: 'usd',
          from: Math.floor(thirtyDaysAgo.getTime() / 1000),
          to: Math.floor(Date.now() / 1000),
        },
      };

      try {
        const response = await coinGeckoClient.request(options);
        setCoin(response.data);
        setPrices(response.data.prices);
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
        const labels = prices.map((price) => {
          return new Date(price[0]);
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
                data: prices.map((price) => price[1]),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
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
      {coin && (
        <div className="coin-detail-content">
            <button onClick={addToFavorites}>Add to Favorites</button>
          <div className="coin-detail-chart">
            <canvas ref={chartRef}></canvas>
          </div>
          {coin.description && coin.description.en && (
            <div className="coin-detail-description">
              <h2>Description</h2>
              <p>{coin.description.en}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoinDetail;


