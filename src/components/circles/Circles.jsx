import React,{useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';


// Blockno: "14264937"
// CurrentValue @ $2537.36/Eth: "634.34"
// DateTime: "2022-02-23 22:02:51"
// Method: "Mint Listed"
// TxnFee(USD): "39.218729199437"
//Value_IN(ETH): "0.25"

function Circles() {
  const currentRef = useRef()
  const width = 1800
  const height = 600

  useEffect(() => {
    d3.csv('invisibleFriends.csv').then( (data,error) =>{
      // console.log(data)
      const hash = data.map( (d,i) => {
        const edge = {}
        obj.id = d.From
        obj['BlockNumber']= +d['Blockno'] 
        // edge['PricePaid']= parseFloat( d['CurrentValue @ $2591.36/Eth'] )
        obj['DataTime']= d['DateTime']
        obj['Method']= d['Method']
        obj['TxnFee']= parseFloat(d['TxnFee(USD)'])
        obj['ValueETH']= parseFloat(d['Value_IN(ETH)'])

        return obj
      })
      drawData(hash)
    })
    .catch(console.error)
  },[])  

  function drawData(dataset){
    const len = dataset.length
    const node = currentRef.current

    const blockMax = d3.max(dataset, d => d.BlockNumber )
    const blockMin = d3.min(dataset, d => d.BlockNumber )
    const yTransaction = d3.max(dataset, d => d.TxnFee )
    const xScale = d3.scaleLinear().domain([0, len]).range([100,width-10])
    const yScale = d3.scaleLinear().domain([0,yTransaction]).range([0,height-100])
    let radiusScale = d3.scaleLinear().domain([0,yTransaction]).range([1,40]);
    
    const svg = d3.select(node)
    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("r", d => radiusScale(d.TxnFee))
      .attr("cx", (d,i) => xScale(i) )
      .attr("cy", d => height - yScale(d.TxnFee))
      .attr("fill", "#5790FB")
      .attr("stroke", "black")
    console.log(dataset)
  }   
  return (
    <div id="drawing">
       <svg ref={currentRef} width={width} height={height} />
    </div>
  );
}

export default Circles;
