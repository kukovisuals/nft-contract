import React,{useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import './Draw.css'
// Blockno: "14264937"
// CurrentValue @ $2537.36/Eth: "634.34"
// DateTime: "2022-02-23 22:02:51"
// Method: "Mint Listed"
// TxnFee(USD): "39.218729199437"
//Value_IN(ETH): "0.25"

function Draw() {
  const currentRef = useRef()

  const width = 1800
  const height = 1200

  useEffect(() => {
    d3.csv('invisibleFriends.csv').then( (data,error) =>{
      // console.log(data)
      const nodes = data.map( (d,i) => {

        const node = {}
          node['source']= +d['Blockno']      
          node['target']= d.From
          node['salary']= parseFloat(d['TxnFee(USD)'])

        if(i < 100) return node
          // return node
      })
    
      drawData(nodes)
    
    }).catch(console.error)
    
  
  },[])  

  function drawData(dataNode){
    const newNode = dataNode.filter(n => n)
    // const newEdge = dataEdge.filter(n => n)
    const svg = currentRef.current
    const nodes = []
    const edges = []
    const nodeHash = {}

    const g = d3.select(svg).append("g").attr("class", "allCircles").attr("transform", `translate(${0}, ${height/2})`)
    const yScale = d3.scaleLinear().domain([0, d3.max(newNode, d=> d.salary)]).range([0,150])
    const xScale = d3.scaleOrdinal().domain([0,newNode.length]).range([100,width-200])
    let colorScale = ['orange', 'lightblue', '#B19CD9'];


    newNode.forEach( (edge,i) => {
      if (!nodeHash[edge.source]) {
        nodeHash[edge.source] = {id: edge.source, radius: yScale(edge.salary), value: i};
        nodes.push(nodeHash[edge.source]);
      }
    });
    let simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(5))
      .force('x', d3.forceX().x( (d,i) =>  xScale(i) ) )
      .force('y', d3.forceY().y( (d) => 0 ) )
      .force('collision', d3.forceCollide().radius(d  => d.radius )) 
      .on('tick', ticked);

    function ticked() {
      g
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', d => d.radius)
        .attr('cx', (d) => d.x )
        .attr('cy', (d) => d.y );
    }

    console.log(nodes)
  };
   

  return (
    <div id="drawing">
       <svg ref={currentRef} width={width} height={height} />
    </div>
  );
}

export default Draw;
