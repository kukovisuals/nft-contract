import React,{useState, useRef, useEffect} from 'react';
import colorbrewer from 'colorbrewer'
import * as d3 from 'd3';
import './Draw.css'

function Draw() {
  const currentRef = useRef()
  const [ownerMint, setOwnerMint] = useState(false)
  const [provance, setProbance] = useState(false)
  const [approval, setApproval] = useState(false)
  const [minListed, setMintListed] = useState(true)
  const [active, setActive] = useState(false)

  const width = 1800
  const height = 1200

  useEffect(() => {
    d3.csv('invisibleFriends.csv').then( (data,error) =>{

      const nodes = data.map( (d,i) => {
        const node = {}
          node['id']= d.From
          node['BlockNumber']= +d['Blockno']      
          node['TxnFee']= parseFloat(d['TxnFee(USD)'])
          node['Method']= d['Method']
        // if(i < 100) return node
          return node
      })
      drawData(nodes)
    return () => undefined
    }).catch(console.error)
  },[ownerMint,provance,approval,minListed,active])  

  const handleChange = (e) => {
    switch(e.target.innerText){
      case "Owner Mint":          setOwnerMint(true);setProbance(false);setApproval(false);setMintListed(false);setActive(false)
        break;
      case "Set Provenance Hash": setOwnerMint(false);setProbance(true);setApproval(false);setMintListed(false);setActive(false)
        break;
      case "Set Approval For All": setOwnerMint(false);setProbance(false);setApproval(true);setMintListed(false);setActive(false)
        break;
      case "Mint Listed":          setOwnerMint(false);setProbance(false);setApproval(false);setMintListed(true);setActive(false)
        break;
      case "Set Active":           setOwnerMint(false);setProbance(false);setApproval(false);setMintListed(false);setActive(true)
        break;
      
    }
  }
  function drawData(dataNode){

    if(!dataNode) return 
    const newNode = dataNode.filter(n => n)
    // const newEdge = dataEdge.filter(n => n)
    const svgEl = d3.select( currentRef.current)
    const nodes = []
    const edges = []
    const nodeHash = {}

    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${50},${(height/2 +100)})`);
    const maxTxn = d3.max(newNode, d=> d.TxnFee)
    const yScale = d3.scaleLinear().domain([0, maxTxn]).range([0,50])
    const yAScale = d3.scaleLinear().domain([0, maxTxn]).range([0,height/2])
    const xScale =d3.scaleBand().domain(["Owner Mint","Set Provenance Hash","Set Approval For All","Mint Listed","Set Active" ]).range([0,width-100])
    const colorScale = d3.scaleQuantize().domain([0,maxTxn]).range(colorbrewer.Blues[9])
//sces, schemeRdBu, schemeRdGy, schemeRdPu, schemeRdYlBu, schemeRdYlGableau10, schemeYlGn, schemeYlGnBu, schemeYlOrBr, schemeYlOrRd
    if(ownerMint){
      const newMethod = newNode.filter( d => d.Method === "Owner Mint")
      newMethod.map( (edge,i) => {
        nodeHash[edge.id] = {id: edge.id, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee) };
        nodes.push(nodeHash[edge.id]);        
      });
    } else if(provance){
      const newMethod = newNode.filter( d => d.Method === "Set Provenance Hash")
      newMethod.map( (edge,i) => {
        nodeHash[edge.id] = {id: edge.id, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee) };
        nodes.push(nodeHash[edge.id]);        
      });
    } else if(approval){
      const newMethod = newNode.filter( d => d.Method === "Set Approval For All")
      newMethod.map( (edge,i) => {
        nodeHash[edge.id] = {id: edge.id, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee) };
        nodes.push(nodeHash[edge.id]);        
      });
    } else if(minListed){
      const newMethod = newNode.filter( d => d.Method === "Mint Listed")
      newMethod.map( (edge,i) => {
        nodeHash[edge.id] = {id: edge.id, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee) };
        nodes.push(nodeHash[edge.id]);        
      });
    } else if(active){
      const newMethod = newNode.filter( d => d.Method === "Set Active")
      newMethod.map( (edge,i) => {
        nodeHash[edge.id] = {id: edge.id, radius: yScale(edge.TxnFee), color: colorScale(edge.TxnFee) };
        nodes.push(nodeHash[edge.id]);        
      });
    }   


    svg.append("g")
      .attr("transform",` translate(${0}, ${0})`)
      .append("text")
      .attr('x', 50 )
      .attr('y', 40 )
      .attr("font-size", "30px")
      .style("fill", "white")
      .text("Transaction Fee")

    let simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(0))
      .force('x', d3.forceCenter().x(width/2).y(0) )
      .force('collision', d3.forceCollide().radius(d  => d.radius )) 
      .on('tick', ticked);

    function ticked() {
      svg
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .style('fill', d => (d.color))
        .attr('r', d => d.radius)
        .attr('cx', (d) => d.x )
        .attr('cy', (d) => d.y )
    }
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
      .attr("transform", `translate(${50},${-600})`)
     .attr('class', "xAxis")
     .call(xAxis)

    const yAxis = d3.axisLeft(yAScale).tickFormat(d => d3.format("$,.2r")(d) );
    svg.append("g")
      .attr("transform", `translate(${50},${-600})`)
      .attr('class', "yAxis")
      .call(yAxis)

  };

  return (
    <div id="drawing">
    <div className="button-rev">
      <button className="buttton-one" onClick={handleChange}> Set Provenance Hash </button>
      <button className="buttton-one" onClick={handleChange}> Set Approval For All </button>
    </div>
    <div className="buttonClass">
      <button onClick={handleChange}> Owner Mint </button>
      <button onClick={handleChange}>Mint Listed </button>
      <button onClick={handleChange}> Set Active </button>
    </div>
       <svg ref={currentRef} width={width} height={height} />
    </div>
  );
}

export default Draw;
