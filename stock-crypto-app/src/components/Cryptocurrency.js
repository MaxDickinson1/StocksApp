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

  useEffect(() => {
    const fetchCoin = async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        params: {
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          localization: false,
        },
      };

      try {
        const response = await coinGeckoClient.request(options);
        setCoin(response.data);
        setPrices(response.data.market_data.sparkline_7d.price);
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
          date.setDate(date.getDate() - 6 + index);
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











