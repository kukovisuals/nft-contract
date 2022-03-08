import React,{useEffect, useRef} from 'react'
import * as d3 from 'd3'

import {FilterData} from '../FilterData/FilterData';

// "TOTAL POR IRREGULARIDAD",2.901.141.500 ,367.782.500,755.915.855,17.658.038.151,21.682.878.006
function BarChat({datos, colorPicker}){
	
	const width = 1000
	const height = 400
	const currentRef = useRef()
	
  useEffect(() =>{

    d3.csv(datos).then( d => {
      newBar(d)
    }).catch( (e) => console.log(e) )

  },[colorPicker])


	function newBar(data){
		const filterData = data.map( (d,i) => Object.entries(FilterData(d))[5][1]	)
		const departamentos = data.map( d => Object.entries(FilterData(d))[0][1] )

		const node = currentRef.current

		const svg = d3.select(node)
		const max = d3.max(filterData)
		const min = d3.min(filterData)

		const colorScale = d3.scaleQuantize().domain([min,max]).range(colorPicker)
		const yScale = d3.scaleLinear().domain([0, max]).range([0, height])
		const xScale = d3.scaleLinear().domain([0, filterData.length + 1]).range([200  , width ])

		const yAScale = d3.scaleLinear().domain([0, max]).range([height+40, 0])
		let yAxis = d3.axisLeft().scale(yAScale).tickFormat(d => d3.format("$,.2r")(d) ).tickSize(10)
		let yAxis2 = d3.axisRight().scale(yAScale).tickFormat(d => d3.format("$,.2r")(d) ).tickSize(width)

		svg.selectAll("text")
			.data(departamentos)
			.enter()
			.append("text")
			.attr("x", (d,i) => xScale(i) )
			.attr("y", d => height+80 )
			.attr("fill", (d,i) => "white")
			.attr("font-size", 8)
			.text(d => d.charAt(0) + d.toLowerCase().slice(1) )

		svg.append("g")
			.attr("transform","translate(200,10) ")
			.style("font-size", "15px")
			.call(yAxis)

		svg.append("g")
			.attr("transform","translate(200,10) ")
			.style("font-size", "15px")
			.call(yAxis2)
		
		svg.append("g").selectAll("rect")
			.data(filterData)
			.enter()
			.append("rect")
			.attr("x", (d,i) => xScale(i) )
			.attr("y", d => height+50 - yScale(d))
			.attr("width", width /  filterData.length  - 21 )
			.attr("fill", (d,i) => colorScale(d))
			.attr("height", d => yScale(d))
	}

	return	<svg ref={currentRef} width={width} height={height+100}/>
	
	
}

export default BarChat