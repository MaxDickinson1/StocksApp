import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './CoinDetails.css';

const CoinDetails = ({ cryptocurrencies }) => {
  const { id } = useParams();
  const history = useHistory();

  const currency = cryptocurrencies.find((currency) => currency.id === id);

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="coin-details">
      <div className="coin-details-header">
        <img className="coin-details-image" src={currency.image} alt={currency.name} />
        <h2 className="coin-details-title">
          {currency.name} ({currency.symbol.toUpperCase()})
        </h2>
        <button className="coin-details-button" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
      <div className="coin-details-info">
        <div className="coin-details-price">
          <h3>Current Price:</h3>
          <p>{currency.current_price} {currency.symbol.toUpperCase()}</p>
        </div>
        <div className="coin-details-market">
          <h3>Market Cap:</h3>
          <p>{currency.market_cap}</p>
        </div>
        <div className="coin-details-high">
          <h3>24h High:</h3>
          <p>{currency.high_24h} {currency.symbol.toUpperCase()}</p>
        </div>
        <div className="coin-details-low">
          <h3>24h Low:</h3>
          <p>{currency.low_24h} {currency.symbol.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;

