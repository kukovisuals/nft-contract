import React,{useState, useRef, useEffect} from 'react';
import colorbrewer from 'colorbrewer'
import * as d3 from 'd3';
import MenuButton from '../../MenuButton/MenuButton';
import './ForcesNetwork.css'

function ForcesNetwork({dimensionsW = 500, dimensionsH = 500,  comingData =[]}) {
  const currentRef = useRef()
  const [mainNode, setMainNode] = useState([])

  const nodeHash = {}
  let maxTxn, colorScale, yScale, txMin,txMean,txMax

  // const margin = {
  //   left: 20, 
  //   top: 100,
  //   right: 20, 
  //   bottom: 50,
  // }
  const r = 7
  const handleChange =  (e) => {
    switch(e.target.innerText){
      case "Owner Mint":          
        const a = comingData.filter( d => d.Method === "Owner Mint")
        
        maxTxn = d3.extent(a, d=> d.TxnFee)
         
        colorScale = d3.scaleQuantize().domain(maxTxn).range(colorbrewer.BuPu[4])
        yScale = d3.scaleLinear().domain(maxTxn).range([0,r])
        
        setMainNode([
          ...a.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id, dTime: edge.DateTime,  tfee: edge.TxnFee, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])        
        break;
      case "Set Provenance Hash": 
        const b = comingData.filter( d => d.Method === "Set Provenance Hash")

        maxTxn = d3.extent(b, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain(maxTxn).range(colorbrewer.Set1[3])
        yScale = d3.scaleLinear().domain(maxTxn).range([0,r])

        setMainNode([
          ...b.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id, dTime: edge.DateTime,  tfee: edge.TxnFee, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])  
        break;
      case "Set Approval For All": 
       const c = comingData.filter( d => d.Method === "Set Approval For All")

        maxTxn = d3.extent(c, d=> d.TxnFee).reverse()

        txMin = d3.min(c, d=> d.TxnFee)
        txMean = d3.median(c, d=> d.TxnFee)
        txMax = d3.max(c, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain([txMin, txMean, txMax]).range( colorbrewer.RdBu[4] )
        yScale = d3.scaleLinear().domain(maxTxn).range([0,r])

        setMainNode([
          ...c.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id, dTime: edge.DateTime,  tfee: edge.TxnFee, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])        
        break;
      case "Mint Listed":          
        const d = comingData.filter( d => d.Method === "Mint Listed")

        maxTxn = d3.extent(d, d=> d.TxnFee).reverse()
        txMin = d3.min(d, d=> d.TxnFee)
        txMean = d3.median(d, d=> d.TxnFee)
        txMax = d3.max(d, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain([txMin, txMean, txMax]).range( colorbrewer.RdBu[4] )
        yScale = d3.scaleLog().domain(maxTxn).range([0,r])

        setMainNode([
          ...d.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id,  dTime: edge.DateTime,  tfee: edge.TxnFee, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])
        break;
      case "Set Active":           
        const f = comingData.filter( d => d.Method === "Set Active")

        maxTxn = d3.extent(f, d=> d.TxnFee)
        colorScale = d3.scaleQuantize().domain(maxTxn).range(colorbrewer.Reds[3])
        yScale = d3.scaleLinear().domain(maxTxn).range([0,r])

        setMainNode([
          ...f.map( (edge,i) =>  nodeHash[edge.id] = {id: edge.id, dTime: edge.DateTime,  tfee: edge.TxnFee, transaction_fee: edge.TxnFee, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee)})
        ])          
        break;

        default:
        throw new Error()
    }
  };
  useEffect(() => {

    const svgEl = d3.select( currentRef.current)
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g").attr('transform', `translate(0,-110)`)
    // const xScale =d3.scaleBand().domain(["Owner Mint","Set Provenance Hash","Set Approval For All","Mint Listed","Set Active" ]).range([0,dimensionsW-150])

    // Define the div for the tooltip
    let div = d3.select('.tooltip-area').style('opacity', 0);
    let div2 = d3.select('.tooltip-area2').style('opacity', 0);
    let div3 = d3.select('.tooltip-area3').style('opacity', 0);

    const ticked = () => {
      svg
        .selectAll('circle')
        .data(mainNode)
        .join('circle')
        .style('fill', d => (d.color))
        .attr('r', d => d.radius)
        .attr('cx', (d) => d.x )
        .attr('cy', (d) => d.y )
        .on("click" , (e, d) => {

          navigator.clipboard.writeText(d.id);
          alert("Copied wallet address: " + d.id);
        } ) 
        .on("mousemove", (e,d) => {
          const text = d3.select('.tooltip-area__text');
          const text2 = d3.select('.tooltip-area__text2');
          const text3 = d3.select('.tooltip-area__text3');
          text.text(`Hash ID: ${d.id}`);
          text2.text(`Transaction Fee (USD): $ ${(d.tfee)}` );
          text3.text(`Day & time: ${d.dTime} ` );
           
        })
         .on("mouseover", (d) => {    
            div3.style("opacity", 1); 
            div2.style("opacity", 1);  
            div.style("opacity", 1); 
            })          
        .on("mouseleave", (d) => {    
            div.style("opacity", 0);  
            div3.style("opacity", 0); 
            div2.style("opacity", 0);  
        });

    } 
    d3.forceSimulation(mainNode)
      .force('charge', d3.forceManyBody().strength(0))
      // .force('x', d3.forceCenter().x(dimensionsW/2).y(0) )
      .force('center', d3.forceCenter().x(dimensionsW * .5).y(dimensionsH * .5))
      .force('collision', d3.forceCollide().radius(d  => d.radius )) 
      .on('tick', ticked);


      // console.log(w )
     return () => {}
  },[mainNode])  
  const titleNft = {
    position: 'absolute', 
    'paddingLeft': '10px'
  }
  return (
    <div id="drawingSvg">
      <MenuButton/> 
      <h3 style={titleNft}>Invisible Friends NFT</h3>
      <div className="button-rev">
        <button className="buttton-one" onClick={handleChange}> Set Provenance Hash </button>
        <button className="buttton-one" onClick={handleChange}> Set Approval For All </button>
      </div>
      <div className="buttonClass">
        <button className="buttton-mint" onClick={handleChange}> Owner Mint </button>
        <button className="buttton-mint" onClick={handleChange}>Mint Listed </button>
        <button className="buttton-mint" onClick={handleChange}> Set Active </button>
      </div>
      <svg ref={currentRef} width={dimensionsW} height={dimensionsH} />
      <g className="tooltip-area">
        <text className="tooltip-area__text">aas</text>
      </g>
      <g className="tooltip-area2">
        <text className="tooltip-area__text2">aas</text>
      </g>
      <g className="tooltip-area3">
        <text className="tooltip-area__text3">aas</text>
      </g>
    </div>
  );
}

export default ForcesNetwork;
