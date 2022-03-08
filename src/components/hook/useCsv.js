import React, {useState, useEffect} from 'react';
import * as d3 from 'd3'

export default function useCsv(uri){
	const [data, setData] = useState()
	const [error, setError] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if(!uri) return
		d3.csv(uri)
			.then(res => setData( d3.group(res, d => d.Method) ) )
			.then(() => setLoading(false))
			.catch(setError)
	},[uri])

	return {
		loading,
		data,
		error
	}
}

