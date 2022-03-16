import Fetch from '../Fetch/Fetch';
import StockLineChart from '../StockLineChart/StockLineChart';

function StockChart({symbol}){
  return (
    <Fetch
      uri={`http://fretzcastano.com/stable/stock/twtr/chrt/5dm/${symbol}.json`}
      renderSuccess={StockDetails}
    />

  )
}

function StockDetails({ data }){
  return (
    <StockLineChart
       dataset={data}
    />
  )
}


export default StockChart;