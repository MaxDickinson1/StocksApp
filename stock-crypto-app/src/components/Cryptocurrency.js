import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Cryptocurrency.css';
import coinGeckoInstance from '../coinGeckoInstance';

const Cryptocurrency = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const history = useHistory();

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      const vs_currency = 'usd';

      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: { vs_currency },
      };

      try {
        const response = await coinGeckoInstance.request(options);
        setCryptocurrencies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCryptocurrencies();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchTerms = searchTerm.toLowerCase().split(' ');

  const filteredCryptocurrencies = cryptocurrencies.filter((currency) => {
    const currencyName = currency.name.toLowerCase();
    const currencySymbol = currency.symbol.toLowerCase();
    const currencyPrice = currency.current_price;

    const matchesSearchTerms = searchTerms.every(
      (term) =>
        currencyName.includes(term) || currencySymbol.includes(term),
    );

    const withinPriceRange =
      (minPrice === '' || currencyPrice >= parseFloat(minPrice)) &&
      (maxPrice === '' || currencyPrice <= parseFloat(maxPrice));

    return matchesSearchTerms && withinPriceRange;
  });

  const handleCoinClick = (id) => {
    history.push(`/coins/${id}`);
  };

  return (
    <div className="coin-list">
      <h1 className="title">Cryptocurrencies</h1>
      <div className="search-bar">
        <input
          type="text"
          className="coin-search-bar"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          type="number"
          className="coin-search-price"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          className="coin-search-price"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="coin-grid">
        {filteredCryptocurrencies.map((currency) => (
          <div
            key={currency.id}
            className="coin-card"
            onClick={() => handleCoinClick(currency.id)}
          >
            <div className="coin-card-image">
              <img src={currency.image} alt={`${currency.name} logo`} />
            </div>
            <div className="coin-card-details">
              <h2 className="coin-name">{currency.name}</h2>
              <p className="coin-symbol">{currency.symbol.toUpperCase()}</p>
              <p className="coin-price">
                ${currency.current_price.toLocaleString()}
              </p>
              {currency.description && currency.description.en && (
                <p className="coin-description">{currency.description.en}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrency;











