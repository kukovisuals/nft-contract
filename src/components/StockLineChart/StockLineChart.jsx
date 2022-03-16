import { useEffect, useRef} from 'react';
import {formatDate} from '../Helper/formatDate';
import useNextDate from '../hook/useNextDate';
import * as d3 from 'd3';


function StockLineChart({dataset =[], renderItem, renderEmpty }){

  const [data, stockDate, prev, next] = useNextDate(dataset[0].date, dataset)
  const currentRef = useRef()

  const [w,h] = [1200, 750]
  const [top, right, bottom, left] = [100,50, 20,50] 


  useEffect(()=> {
  

    const svg = currentRef.current

    const timeDomain = data.map( d => d.minute)
    const lowPrice = d3.min(data, d => d.low)
    const highPrice = d3.max(data, d => d.high)
  
    let blue = "#5EE3E6",  orange = "#FF00CB", backgroundColor = "#282c34"
    const xScale = d3.scaleBand().domain(timeDomain).range([ 0, w ]);
    const yScale = d3.scaleLinear().domain([lowPrice -.2, highPrice + .2]).range([ h, 0 ])
    
    const xAxis = d3.axisBottom(xScale).tickSize(h).tickValues(timeDomain.filter((d,i)=> i%3===0 )) 
    const yAxis = d3.axisRight(yScale).tickSize(w)

    // clean the svg canvas
    d3.select(svg).append('g')
      .selectAll("rect")
      .data(data)                                                     
      .enter()
      .append("rect")
      .attr("x",0)
      .attr("y",0)        
      .attr('width', w+100)
      .attr('height', h+10)                      
      .style("fill", backgroundColor)

    // bottom x Axis
    d3.select(svg).append('g').attr('id', 'xAxisG').call(xAxis)
    .selectAll('.tick line').attr('stroke', '#474E5C')
    // rigth y Axis
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

  },[stockDate,data])

  return (
    <div className="button-date-container">
      <div className="stock-fecha">
        <p> { stockDate } </p>
      </div>
      <div className="nextRight">
        <button className="stock-button" onClick={prev}>prev</button>
        <button className="stock-button" onClick={next}>next</button>
      </div>
      <svg ref={currentRef} width={w+left+right} height={h+top+bottom } />
      
    </div>
   )
}

export default StockLineChart;
