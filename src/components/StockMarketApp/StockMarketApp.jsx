import React, {useState, useEffect, useRef, useCallback} from 'react';
import MenuButton from '../MenuButton/MenuButton';
import useFetch from '../hook/useFetch';
import * as d3 from 'd3';

import './StockMarketApp.scss';

function StockChart({symbol}){
  return (
    <Fetch
      uri={`http://fretzcastano.com/stable/stock/twtr/chrt/5dm/${symbol}.json`}
      renderSuccess={StockDetails}
    />

  )
}



function List({dataset =[], renderItem, renderEmpty }){

  const [stockDate,  setStockDate] = useState( new Date('2022-02-26'))
  const currentRef = useRef()

  const [w,h] = [1500, 750]
  const [top, right, bottom, left] = [100,50, 20,50]
  const startDate = new Date('2022-02-26')
  const endDate = new Date('2022-03-05')

  const prev = useCallback(() => {
      if ( (stockDate.getDate() === startDate.getDate())&&(stockDate.getMonth() === startDate.getMonth() ) ) return setStockDate(endDate);
      let loop = new Date(stockDate)
      let newDate = loop.setDate(loop.getDate() - 1)
      loop = new Date(newDate)
      setStockDate( loop );
    }, [stockDate]);

    const next = useCallback(() => {
      if ((stockDate.getDate() === endDate.getDate())&&(stockDate.getMonth() === endDate.getMonth() )) return setStockDate(startDate);
      let loop = new Date(stockDate)
      let newDate = loop.setDate(loop.getDate() + 1)
      loop = new Date(newDate)
      setStockDate( loop );
    }, [stockDate]);


    const formatDate = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1 
      const monthf = month.toLocaleString().padStart(2, '0')
      const day = date.getDate().toLocaleString().padStart(2, '0')

      return `${year}-${monthf}-${day}`
    }

  useEffect(()=> {
  
    if(!dataset.length) return 
  // console.log( dataset )

    const node = currentRef.current
    const svg = node

    const data = dataset.filter( d=> d.date == formatDate(stockDate))

      // console.log(!data)
    if(!data) return 

    const timeDomain = data.map( d => d.minute)
    const lowPrice = d3.min(data, d => d.low)
    const highPrice = d3.max(data, d => d.high)
  
    let blue = "#5EE3E6",  orange = "#FF00CB"
    const xScale = d3.scaleBand().domain(timeDomain).range([ 0, w ]);
    const yScale = d3.scaleLinear().domain([lowPrice -.2, highPrice + .2]).range([ h, 0 ])
    
    
    d3.select(svg).append('g')
      .selectAll("rect")
      .data(data)                                                     
      .enter()
      .append("rect")
      .attr("x",0)
      .attr("y",0)        
      .attr('width', w+100)
      .attr('height', h+10)                      
      .style("fill", '#282c34')
    const xAxis = d3.axisBottom(xScale).tickSize(h).tickValues(timeDomain.filter((d,i)=> i%3===0 ))
    d3.select(svg).append('g').attr('id', 'xAxisG').call(xAxis)
    .selectAll('.tick line').attr('stroke', '#474E5C')


    const yAxis = d3.axisRight(yScale).tickSize(w)
      d3.select(svg).append("g").attr("id", "yAxisG").call(yAxis)
      .selectAll('.tick line').attr('stroke', '#8B99B5')


    d3.select(svg).append('g').attr('class', 'drawCircles')
      .selectAll("circle.highs")
      .data(data)                                                     
      .enter()
      .append("circle")
      .attr("class", "highs")
      .attr("r", 5)
      .attr("cx", d => xScale(d.minute))
      .attr("cy", d => yScale(d.high))                              
      .style("fill", blue)

    d3.select(svg).append('g').attr('class', 'drawCircles')
    .selectAll("circle.lows")
      .data(data)                                                     
      .enter()
      .append("circle")
      .attr("class", "lows")
      .attr("r", 5)
      .attr("cx", d => xScale(d.minute))
      .attr("cy", d => yScale(d.low))                            
      .style("fill", orange)

   const lambdaXScale = d => xScale(d.minute)

      const highLine = d3.line()
        .x(lambdaXScale)
        .y(d => yScale(d.high))
      const lowLine = d3.line()
        .x(lambdaXScale)
        .y(d => yScale(d.low))

      d3.select(svg).append('g').attr('class', 'drawCircles')
        .append("path")                              
        .attr("d", highLine(data))
        .attr("fill", "none")
        .attr("stroke", blue)
        .attr("stroke-width", 2)
      d3.select(svg).append('g').attr('class', 'drawCircles')
        .append("path")
        .attr("d", lowLine(data))
        .attr("fill", "none")
        .attr("stroke", orange)
        .attr("stroke-width", 2)




  },[stockDate])

  return (
    <div className="button-date-container">
      <div className="stock-fecha">
        <p> {formatDate(stockDate)} </p>
      </div>
      <div>
        <button  className="stock-button" onClick={prev}  >prev</button>
        <button  className="stock-button" onClick={next} >next</button>
      </div>
      <svg ref={currentRef} width={w+left+right} height={h+top+bottom } />
      
    </div>
   )
}


function Fetch({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = error => (
    <pre>{JSON.stringify(error, null, 2)}</pre>
  ) 
}) {
  
  const { loading, data, error } = useFetch(uri);
  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({ data });
}

function StockDetails({ data }){
  
  return (
    <List
       dataset={data}
    />
  )
}

function StockMarketApp() {
  const [symbol, setSymbol] = useState('tsla')
  const [sendSymbol, setSendSymbol] = useState()

  const handleChange = useCallback( (e) =>{
    e.preventDefault()
    setSendSymbol(e.target.value)
  },[symbol])
  const handleSubmit = useCallback( (e) =>{
    e.preventDefault()
    setSymbol(sendSymbol)
  },[sendSymbol])
  // console.log(symbol)
  return (
    <div className="stockMarket-chart">
      <MenuButton/>   
      <div className="submitSymbol">
        <form onSubmit={handleSubmit}>
          <label></label>
          <input className="stock-input"
            type="text"
            value={sendSymbol}
            onChange={handleChange}
          /> 
        </form>
        <input className="stock-button" type="submit" value="enter"/>
      </div>
      <h1 className="stock-title">{symbol.toUpperCase()}</h1>
      <StockChart symbol={symbol}/>
    </div>
  )
}

export default StockMarketApp;
