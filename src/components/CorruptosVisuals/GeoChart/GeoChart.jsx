import React,{useEffect, useRef} from 'react'
// import geoData from '../../data/colombia.geo.json';
import * as d3 from 'd3'
import {FilterData} from '../FilterData/FilterData';

function GeoChart({colorPicker, datos}){


	console.log('Geographics--------Map ')
	const mapRef = useRef()
	const width = 600
	const height = 500

	let depar = ['ANTIOQUIA','ARAUCA','BOYACA','CALDAS','CAUCA','CESAR','CUNDINAMARCA','HUILA','META','NARINO','SANTANDER','SUCRE','TOLIMA']

	useEffect(() =>{

    // d3.json('colombia.geo.json').then( d => {
    //   newGeoFx(d)
    // }).catch( (e) => console.log(e) )
		Promise.all([
			d3.json('http://localhost:3000/colombia.geo.json'),
			d3.csv(datos)
			])
			.then( (d) =>{
				newGeoFx(d) 
			}) 
			.catch( (e) => console.log(e) )
    
  },[])


	
	function newGeoFx(data){

	 	// filter data -------
		const filterData = data[1].map( (d,i) => Object.entries(FilterData(d))[5][1]	)
		const max = d3.max(filterData)
		const min = d3.min(filterData)
		// color scale data
		// const colorScale = d3.scaleQuantize().domain([min,max]).range(colorPicker)
	
		let matchColor = new Map()
		depar.map( (d,i) => matchColor.set(d, colorPicker[i]))

		let centered

		// Load map data		
		let features = data[0].features;

		let projection = d3.geoMercator()
		  .scale(1400)
		  // Center the Map in Colombia
		  .center([-74, 4.6])
		  .translate([width / 2, height / 2]);

	  //let color = d3.scaleBand().domain(colorPicker).range(depar);
		
		let path = d3.geoPath().projection(projection);
	  // Set svg width & height
		let svg = d3.select(mapRef.current)

		// Add background
		svg.append('rect')
		  .attr('class', 'background')
		  .attr('width', width)
		  .attr('height', height)

		let g = svg.append('g');

		let effectLayer = g.append('g')
		  .classed('effect-layer', true);

		let mapLayer = g.append('g')
		  .classed('map-layer', true);

		// let dummyText = g.append('text')
		//  .classed('dummy-text', true)
		//  .attr('x', 10)
		//  .attr('y', 30)
		//  .style('opacity', 0);

		let bigText = g.append('text')
		  .classed('big-text', true)
		  .attr('x', 20)
		  .attr('y', 45);

			// console.log(matchColor)
		  // Update color scale domain based on data

	  // Draw each province as a path
	  mapLayer.selectAll('path')
	      .data(features)
	    .enter().append('path')
	      .attr('d', path)
	      .attr('vector-effect', 'non-scaling-stroke')
	      .style('fill', fillFn)
	      .on('mouseover', mouseover)
	      .on('mouseout', mouseout)

		// Get province name
		function nameFn(d){
		  return d && d.properties ? d.properties.NOMBRE_DPT : null;
		}

		// Get province name length
		function fillFn(d){
		  let n = nameFn(d);
		  return matchColor.has( n ) ? matchColor.get( n ) : '#B7FAC1';
		}

		function hasDepartamento(d){
			return matchColor.has(d) ? matchColor.get( d ) : 'white';
		}
		
		function mouseover(d){
		  // Highlight hovered province
		  d3.select(this).style('fill', 'white');

		  let departamento = d.toElement.__data__.properties.NOMBRE_DPT
		  bigText
		  .attr("fill", hasDepartamento(departamento) )
		 	.text(departamento.charAt(0) + departamento.toLowerCase().slice(1) )

		  // console.log(matchColor.has(departamento))
		}

		function mouseout(d){
		  // Reset province color
		  mapLayer.selectAll('path')
		    .style('fill', function(d){return centered && d===centered ? '#D5708B' : fillFn(d);});

		  // Remove effect text
		  effectLayer.selectAll('text').transition()
		    .style('opacity', 0)
		    .remove();

		  // Clear province name
		  bigText.text('');
		}

	}
		

	return 	<svg ref={mapRef} width={width} height={height}/>
}

export default GeoChart