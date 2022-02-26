import React,{useState, useRef, useEffect} from 'react';
import colorbrewer from 'colorbrewer'
import * as d3 from 'd3';
import './ForcesNetwork.css'

function ForcesNetwork({dimensionsW, dimensionsH,  comingData =[]}) {
  const currentRef = useRef()
  const tulipRef = useRef()
  const [mainNode, setMainNode] = useState([])

  const nodeHash = {}
  let maxTxn, colorScale, yScale

  const handleChange = ( (e) => {
    switch(e.target.innerText){
      case "Owner Mint":          
        const a = mainNode.filter( d => d.Method === "Owner Mint")
        
        maxTxn = d3.max(a, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain([0,maxTxn]).range(colorbrewer.Blues[9])
        yScale = d3.scaleLinear().domain([0, maxTxn]).range([0,25])
        
        setMainNode([
          a.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id,maxTxn, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])        
        break;
      case "Set Provenance Hash": 
        const b = comingData.filter( d => d.Method === "Set Provenance Hash")

        maxTxn = d3.max(b, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain([0,maxTxn]).range(colorbrewer.Blues[9])
        yScale = d3.scaleLinear().domain([0, maxTxn]).range([0,25])

        setMainNode([
          ...b.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id,maxTxn, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])  
        break;
      case "Set Approval For All": 
       const c = comingData.filter( d => d.Method === "Set Approval For All")

        maxTxn = d3.max(c, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain([0,maxTxn]).range(colorbrewer.Blues[9])
        yScale = d3.scaleLinear().domain([0, maxTxn]).range([0,25])

        setMainNode([
          ...c.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id,maxTxn, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])        
        break;
      case "Mint Listed":          
        const d = comingData.filter( d => d.Method === "Mint Listed")

        maxTxn = d3.max(d, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain([0,maxTxn]).range(colorbrewer.Blues[9])
        yScale = d3.scaleLinear().domain([0, maxTxn]).range([0,25])

        setMainNode([
          ...d.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id,maxTxn, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])
        break;
      case "Set Active":           
        const e = comingData.filter( d => d.Method === "Set Active")

        maxTxn = d3.max(e, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain([0,maxTxn]).range(colorbrewer.Blues[9])
        yScale = d3.scaleLinear().domain([0, maxTxn]).range([0,25])

        setMainNode([
          ...e.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id,maxTxn, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])          
        break;
        default:
        console.log('happy')
    }
  });

  useEffect(() => {

    const svgEl = d3.select( currentRef.current)
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      // .attr("transform", `translate(${50},${(dimensionsH/2 +100)})`);
    const yAScale = d3.scaleLinear().domain([0, d=> d.TxnFee]).range([0,dimensionsH/2])
    const xScale =d3.scaleBand().domain(["Owner Mint","Set Provenance Hash","Set Approval For All","Mint Listed","Set Active" ]).range([0,dimensionsW-150])


    
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
      .attr("transform", `translate(${50},${20})`)
     .attr('class', "xAxis")
     .call(xAxis)

    const yAxis = d3.axisLeft(yAScale).tickFormat(d => d3.format("$,.2r")(d) );
    svg.append("g")
      .attr("transform", `translate(${50},${20})`)
      .attr('class', "yAxis")
      .call(yAxis)
    
    svg.append("g")
      .attr("transform",` translate(${30}, ${dimensionsH * .56})`)
      .append("text")
      .attr('x', 50 )
      .attr('y', 40 )
      .attr("font-size", "30px")
      .style("fill", "white")
      .text("Transaction Fee")

    let tooltip = d3.select(tulipRef.current)
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#000")
    .text("a simple tooltip");

    const ticked = () => {
      svg
        .selectAll('circle')
        .data(mainNode)
        .join('circle')
        .style('fill', d => (d.color))
        .attr('r', d => d.radius)
        .attr('cx', (d) => d.x )
        .attr('cy', (d) => d.y )
  

    }
    d3.forceSimulation(mainNode)
      .force('charge', d3.forceManyBody().strength(0.1))
      // .force('x', d3.forceCenter().x(dimensionsW/2).y(0) )
      .force('center', d3.forceCenter().x(dimensionsW * .5).y(dimensionsH * .5))
      .force('collision', d3.forceCollide().radius(d  => d.radius )) 
      .on('tick', ticked);

     return () => window.removeEventListener('click', handleChange);
  },[mainNode])  

  return (
    <div ref={tulipRef} id="drawingSvg">
      <div className="button-rev">
        <button className="buttton-one" onClick={handleChange}> Set Provenance Hash </button>
        <button className="buttton-one" onClick={handleChange}> Set Approval For All </button>
      </div>
      <div className="buttonClass">
        <button onClick={handleChange}> Owner Mint </button>
        <button onClick={handleChange}>Mint Listed </button>
        <button onClick={handleChange}> Set Active </button>
      </div>
      <svg ref={currentRef} width={dimensionsW} height={dimensionsH} />
    </div>
  );
}

export default ForcesNetwork;
