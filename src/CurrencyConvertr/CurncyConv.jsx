import { Component } from 'react';

const API_KEY = '2ccbaedbd43b035f285d9f58'; // <-- Replace with your real API key

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'INR',
      exchangeRate: null,
      currencies: []
    };
  }

  componentDidMount() {
    this.fetchExchangeRate();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.fromCurrency !== this.state.fromCurrency || 
  //       prevState.toCurrency !== this.state.toCurrency) {
  //     this.fetchExchangeRate();
  //   }
  // }

  fetchExchangeRate = () => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${this.state.fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          exchangeRate: data.conversion_rates[this.state.toCurrency],
          currencies: Object.keys(data.conversion_rates)
        });
      })
      .catch(err => console.error('Failed to fetch exchange rate:', err));
  }

  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value });
  }

  handleFromCurrencyChange = (e) => {
    this.setState({ fromCurrency: e.target.value });
  }

  handleToCurrencyChange = (e) => {
    this.setState({ toCurrency: e.target.value });
  }

  render() {
    const { amount, fromCurrency, toCurrency, exchangeRate, currencies } = this.state;
    const convertedAmount = exchangeRate ? (amount * exchangeRate).toFixed(2) : '...';

    return (
      <div className="container">
        <h1>💱 Currency Converter</h1>

        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={this.handleAmountChange}
          />

          <select 
            value={fromCurrency} 
            onChange={this.handleFromCurrencyChange}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>

          <span>→</span>

          <select 
            value={toCurrency} 
            onChange={this.handleToCurrencyChange}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>

        <h2>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </h2>
      </div>
    );
  }
}

export default App;