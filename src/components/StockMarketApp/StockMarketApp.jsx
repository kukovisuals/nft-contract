import {useState,  useCallback} from 'react';

import MenuButton from '../MenuButton/MenuButton';
import StockChart from '../StockChart/StockChart';
import './StockMarketApp.scss';

function StockMarketApp() {
  const [symbol, setSymbol] = useState('tsla')
  const [sendSymbol, setSendSymbol] = useState()

  const handleChange = useCallback( (e) =>{
    setSendSymbol(e.target.value)
  },[sendSymbol])
  const handleSubmit = useCallback( (e) =>{

  e.preventDefault()
  console.log(sendSymbol)
    setSymbol(sendSymbol)
  },[sendSymbol])
  
  return (
    <div className="stockMarket-chart">
      <MenuButton/> 

      <div className="controllers">
        <div className="divisor">
          <h1 className="stock-title">{symbol.toUpperCase()}</h1>
          <p> Visulizing intraday trades for option trading</p>
          <div className="submitSymbol">
            <form onSubmit={handleSubmit}>
              <label></label>
              <input className="stock-input"
                type="text"
                value={sendSymbol}
                onChange={handleChange}
                minLength="4"
                maxLength="4"
                placeholder="Symbol"
              /> 
            <input className="stock-button" type="hidden" value="enter"/>
            </form>
          </div>
        </div>
      </div>

      <StockChart symbol={symbol}/>
    </div>
  )
}

export default StockMarketApp;
