import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Summary from './components/Summary/Summary';
import Navbar from './components/Navbar/Navbar';
import NewTransaction from './components/NewTransaction/NewTransaction';
import Balance from './components/Balance/Balance';
import Sort from './components/Filter/Sort';
import Main from './components/Main/Main';

import { GlobalProvider } from './context/GlobalState';

import './App.css'

const App = () => {
  const options = [
    { key: 'eur', value: 'EUR', text: 'EUR', symbol:'€'},
    { key: 'usd', value: 'USD', text: 'USD', symbol:'$'},
    { key: 'gbp', value: 'GBP', text: 'GBP', symbol:'£' },
  ];
  const [currency, setCurrency] = useState("EUR")

  const currencyOptions = options.map((option) => (
    <option key={option.key} value={option.value} symbol={option.symbol}>
        {option.text}
    </option>   
))

const handleSelect = (event) => {
  const { value } = event.target;
  setCurrency(value);
}

const symbol = options.find((option) => option.value === currency).symbol

  return (
    <GlobalProvider className="app">
      <div className='app'>
        <Navbar 
          handleSelect={handleSelect} 
          currencyOptions={currencyOptions}
        />
        <NewTransaction />
        <Balance 
          symbol={symbol}
        />
        <Main />
      </div>
    </GlobalProvider>
  )
}

export default App
