import {useState, useCallback} from 'react';
import {formatDate, formatDay} from '../Helper/formatDate';

function useNextDate(stockDate = '2022-02-26', stocks = []){

  const [dia,  setDia] = useState( formatDay(stockDate))
  const startDate = formatDay( stocks[0].date )
  const endDate = formatDay( stocks[stocks.length-1].date)

	const checkDay = (move) => {	

  	switch(move){
  		case 'next':
	  		const n = dia.setDate(dia.getDate() + 1)
	    	return setDia( new Date(n));

		  case 'prev': 
		  	const p = dia.setDate(dia.getDate() -1)
    		return setDia( new Date(p));

		  default: 
		  	throw console.log('error')
  	}
	}

	const prev = useCallback(() => {
	  if ( (dia - startDate) === 0  ) return setDia(endDate);
		if( dia.getDay() === 5 ) {
		    const r = dia.setDate(dia.getDate() + 3)
	    	setDia( new Date(r));
		  } else {
		    checkDay('prev')	
		  }
	  }, [dia]);

	const next = useCallback(() => {
    if ( (dia - endDate) === 0) return setDia(startDate);
    if( dia.getDay() === 5 ) {
		    const r = dia.setDate(dia.getDate() + 3)
	    	setDia( new Date(r));
		} else {
	    checkDay('next')	
		}
  }, [dia]);
    console.log('next',formatDate(dia) )
	
  const filterDate = formatDate(dia)
  const data = stocks.filter( d=> d.date === filterDate)
  return [data, filterDate, prev, next]
}

export default useNextDate;