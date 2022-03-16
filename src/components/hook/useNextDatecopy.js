import {useState, useCallback} from 'react';
// import {formatDate} from '../Helper/formatDate';

function useNextDate(stockDate = '2022-02-26', stocks = []){

  const [dia,  setDia] = useState( new Date(stockDate))
  const startDate = new Date( '2022-02-26' )
  const endDate = new Date( '2022-03-05')
  let loop = '' , newDate = ''

  const checkDay = (move) => {
    
    if( dia.getDay() === 6 ) {
      loop = new Date(dia)
      newDate = loop.setDate(loop.getDate() + 2)
      loop = new Date(newDate)
      return setDia( loop );
    }
    // console.log('hi', dia.getDay())
    switch(move){
      case 'next': 
        loop = new Date(dia)
        newDate = loop.setDate(loop.getDate() + 1)
        loop = new Date(newDate)
        return setDia( loop );

      case 'prev': 
        loop = new Date(dia)
        newDate = loop.setDate(loop.getDate() - 1)
        loop = new Date(newDate)
        return setDia( loop );

      default: 
        throw console.log('error')
    }
  }

  const prev = useCallback(() => {
    if ( (dia.getDate() === startDate.getDate())&&(dia.getMonth() === startDate.getMonth() ) ) return setDia(endDate);
    checkDay('prev')
  }, [dia]);

  const next = useCallback(() => {
    if ((dia.getDate() === endDate.getDate())&&(dia.getMonth() === endDate.getMonth() )) return setDia(startDate);
    checkDay('next')
  }, [dia]);

  
  // console.log(dia.getDay(), dia.getDay() === 6, dia, stocks)
  return [dia, prev, next]
}

export default useNextDate;