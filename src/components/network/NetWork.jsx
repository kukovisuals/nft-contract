import React,{useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import './NetWork.css'
// Blockno: "14264937"
// CurrentValue @ $2537.36/Eth: "634.34"
// DateTime: "2022-02-23 22:02:51"
// Method: "Mint Listed"
// TxnFee(USD): "39.218729199437"
//Value_IN(ETH): "0.25"

function NetWork() {
  const currentRef = useRef()

  const width = 1800
  const height = 1200

  useEffect(() => {
    d3.csv('invisibleFriends.csv').then( (data,error) =>{
      // console.log(data)
      const hash = data.map( (d,i) => {

        const edge = {}
          edge['source']= d.From
          edge['target']= +d['Blockno']   

        if(i < 50) return edge
      })
      const nodes = data.map( (d,i) => {

        const node = {}
          node['id']= d.From      
          node['salary']= parseFloat(d['TxnFee(USD)'])

        if(i < 50) return node
      })
    
    
      drawData(nodes, hash)
    
    }).catch(console.error)
    
  
  },[])  

  function drawData(dataNode, dataEdge){
    const newNode = dataNode.filter(n => n)
    const newEdge = dataEdge.filter(n => n)
    const svg = currentRef.current
    

    const yScale = d3.scaleLinear().domain([0, d3.max(newNode, d=> d.salary)]).range([0,200])
    const xScale = d3.scaleOrdinal().domain([0,newNode.length]).range([0,width/2])
    const roleScale = d3.scaleOrdinal()
      .domain(["contractor", "employee", "manager"])
      .range(["#75739F", "#41A368", "#FE9922"])

     const nodeHash = newNode.reduce((hash, node) => {hash[node.id] = node;
      return hash;
    }, {})

     
    console.log(newEdge, nodeHash)
    newEdge.forEach(edge => {
        edge.target = nodeHash[edge.target]
        edge.source = nodeHash[edge.source]
      })

    const linkForce = d3.forceLink()

    const simulation = d3.forceSimulation()
      .force("charge", d3.forceManyBody().strength(-10))         
      .force("center", d3.forceCenter().x(width/2).y(height/2))
      .force("link", linkForce)
      .nodes(newNode)
      .on("tick", forceTick)

    simulation.force("link").links(newEdge)

    d3.select("svg").selectAll("line.link")
      .data(newEdge, d => `${d.source.id}-${d.target.id}`)        
      .enter()
      .append("line")
      .attr("class", "link")
      .style("opacity", .5)
      .style("stroke-width", d => d.weight);

    const nodeEnter = d3.select("svg").selectAll("g.node")         
      .data(newNode, d => d.id)
      .enter()
      .append("g")
      .attr("class", "node");
    nodeEnter.append("circle")
      .attr("r", 5)
      .style("fill", d => roleScale(d.role))
    nodeEnter.append("text")
      .style("text-anchor", "middle")
      .attr("y", 15)
      .text(d => d.id);

      function forceTick() {
       d3.selectAll("line.link")
          .attr("x1", d => d.source.x)
          .attr("x2", d => d.target.x)
          .attr("y1", d => d.source.y)
          .attr("y2", d => d.target.y)
       d3.selectAll("g.node")
          .attr("transform", d => `translate(${d.x},${d.y})`)
      }


  };
   

  return (
    <div id="drawing">
       <svg ref={currentRef} width={width} height={height} />
    </div>
  );
}

export default NetWork;
