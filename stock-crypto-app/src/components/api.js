import axios from 'axios';

export const coinGeckoClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export const getCoins = async () => {
  const response = await coinGeckoClient.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};

export const getCoin = async (id) => {
  const response = await coinGeckoClient.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
    },
  });
  return response.data;
};

export const getCoinMarketChart = async (id, days) => {
  const response = await coinGeckoClient.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: days,
    },
  });
  return response.data.prices;
};

