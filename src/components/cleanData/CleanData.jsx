import React,{ useEffect} from 'react';
// import colorbrewer from 'colorbrewer'
// import * as d3 from 'd3';
// import './ForcesNetwork.css'

function CleanData({dimensionsW, dimensionsH,  comingData =[]}) {

  const methods = new Set()
  // const arr = []
  useEffect(() => {
    for(let data of comingData){
      methods.add(data.Method)
    }

    console.log(methods.size)
  },[])  
  return (
    <div id="drawingSvg">
    <form action="" method="get">
     <label htmlFor="browser">Choose your browser from the list:</label>
      <input list="methods" name="browser" id="browser"/>
      <datalist id="methods">
      {methods.size > 0 ? <Botones data={methods} /> : <h1>hii</h1> }
      </datalist>
      <input type="submit"/>
      </form>
    </div>
  );
}


function Botones({data}){

  console.log(data)
  return <h1>hi</h1>
}

export default CleanData;
