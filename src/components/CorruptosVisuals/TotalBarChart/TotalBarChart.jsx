import React, {useEffect, useRef } from 'react'
import * as d3 from 'd3';

function TotalBarChart(){
	
	const currentRef = useRef()

	const width = 1000
	const height = 300 
	const total = [21682878006]
	const format =  d3.format("$,.2r")
	useEffect(() => {
		myChart()
	}, [])

	const myChart = () => {

		const node = currentRef.current
		const svg = d3.select(node)

		svg.selectAll("rect")
			.data(total)
			.enter()
			.append("rect")
			.attr("x", 200)
			.attr("y", 10)
			.attr("width", width-50)
			.attr("height", 50)
			.attr("fill", "rgb(103, 0, 31)")

		svg.selectAll("text")
			.data(total)
			.enter()
			.append("text")
			.attr("x", 70)
			.attr("y", 30)
			.attr("fill", "white")
			.text(format(21682878006))

	}
	return <svg ref={currentRef} width={width} height={height} />
}

export default TotalBarChart

