import React,{useState, useRef, useEffect} from 'react';
import colorbrewer from 'colorbrewer'
import * as d3 from 'd3';
// import './ForcesNetwork.css'

// 
//       player.id = get['id']
//       if( player.hasOwnProperty( get['source']) ) {
// 
//         player[ get['source'] ].push({ to: get['to'] ,targetETH: parseFloat(get['targetETH']), Value_IN: parseFloat(get['targetETH'])   } )
// 
//       } else {
//         groups.push(  get['source']  )
//        player[ get['source'] ] = []
// 
//       }
function CleanData({dimensionsW, dimensionsH,  comingData =[]}) {
  const [options, setOptions] = useState([])
  const [loading2, setloading2] = useState(true)
  const currentRef = useRef()
 
  const player = {}
  const groups = []
  useEffect(() => {
    // const iterator = comingData[0].nodes.entries()
    const arr = []
    comingData.map( (get, i) =>  {
      if(groups.indexOf(get.Method) < 0){
        groups.push(get.Method)
      }
    })
    const svg = d3.select(currentRef.current)

    const x = d3.scaleOrdinal().domain(groups).range([50, 200, 340,500,600,700,800,900,1000,1100,1200,1300])
    const color = d3.scaleOrdinal().domain(groups).range(colorbrewer.Reds[4])

    const node = svg
      .selectAll("circle")
      .data(comingData)
        .attr('r',20)
        .attr('cx', dimensionsW/2)
        .attr('cy', dimensionsH/2)
        .style('fill', d => color(d.Method)) 
        .style('fill-opacity', 0.8)
        .attr('stroke', 'white')
        .style('stroke-width', 4)
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) )

        // features of forces applied to methods
        let simulation = d3.forceSimulation()
          .force('x', d3.forceX().strength(0.5).x(d => x(d.Method)) )
          .force("y", d3.forceY().strength(0.1).y( dimensionsH/2 ))
          .force("center", d3.forceCenter().x(dimensionsW / 2).y(dimensionsH / 2)) // Attraction to the center of the svg area
          .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
          .force("collide", d3.forceCollide().strength(.1).radius(32).iterations(1)) // 

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
        .nodes(comingData)
        .on("tick", function(d){
            
          node
              .attr("cx", d => d.x)
              .attr("cy", d => d.y)
        });

    // What happens when a circle is dragged?
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }

        console.log(node)
        return () => {}
      },[])  

  // console.log(options)
  return (
    <div id="drawingSvg">
      <svg ref={currentRef} width={dimensionsW} height={dimensionsH} />
    </div>
  );
}


function Botones({data}){

  console.log('jhii', data)
  return <h1>hi</h1>
}

export default CleanData;
