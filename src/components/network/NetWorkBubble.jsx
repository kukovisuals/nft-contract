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

        // if(i < 5000) return node
          return node
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


    const yScale = d3.scaleLinear().domain([0, d3.max(newNode, d=> d.salary)]).range([0,150])
    const xScale = d3.scaleOrdinal().domain([0,newNode.length]).range([0,width/2])
    const roleScale = d3.scaleOrdinal()
      .domain(["contractor", "employee", "manager"])
      .range(["#75739F", "#41A368", "#FE9922"])

    // var nodes = [{}, {}, {}, {}, {}]
//       var numNodes = 100
// var nodes = d3.range(numNodes).map(function(d) {
//   return {radius: Math.random() * 25}
// })
     newNode.forEach(function (edge) {
      if (!nodeHash[edge.source]) {
      nodeHash[edge.source] = {id: edge.source, radius: yScale(edge.salary)};
        nodes.push(nodeHash[edge.source]);
      }
    });
    var simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height/2))
      .force('collision', d3.forceCollide().radius(d  => d.radius ))
      .on('tick', ticked);

    function ticked() {
      d3.select(svg)
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
