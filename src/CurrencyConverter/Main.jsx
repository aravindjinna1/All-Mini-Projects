import { useState, useEffect } from 'react';

const API_KEY = '2ccbaedbd43b035f285d9f58'; // <-- Replace with your real API key from https://www.exchangerate-api.com/

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => { 
        setExchangeRate(data.conversion_rates[toCurrency]);
        setCurrencies(Object.keys(data.conversion_rates)); //Object.entries()for key and value // Object.keys() only for key //Object.values() for only value
      })
      .catch(err => console.error('Failed to fetch exchange rate:', err));
  }, [fromCurrency, toCurrency]);

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return (
    <div className="container">
      <h1>💱 Currency Converter</h1>

      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>

        <span>→</span>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>

      <h2>
        {amount} {fromCurrency} = {exchangeRate ? `${convertedAmount} ${toCurrency}` : '...'}
      </h2>
    </div>
  );
}

export default App;
