import React,{useState, useEffect} from 'react';
import * as d3 from 'd3';

import ForcesNetwork from '../network/forcesNetwork/ForcesNetwork';
// import CorruptosVisuals from '../CorruptosVisuals/CorruptosVisuals';

import useWindowSize from '../Events/WindowSize';
import './NftVisuals.css'

function NftVisuals() {
  const [mainNode, setMainNode] = useState([])
  const [loading, setLoading] = useState(true)

  const [width, height] = useWindowSize()

  useEffect(() => {
    d3.csv('http://fretzcastano/invisibleFriends.csv').then( (data,error) =>{

      const nodes = data.map( (d,i) => {
        const node = {}
          node['id']= d.From
          node['BlockNumber']= +d['Blockno']      
          node['TxnFee']= parseFloat(d['TxnFee(USD)'])
          node['Method']= d['Method']
          node['DateTime'] = d['DateTime']

          return node
      })
      setMainNode(nodes)
      setLoading(false)
    return () => {}
    }).catch(console.error)
  },[])  


  return (
    <div id="drawing">
      {loading && <h3>Loading.....</h3> }
      {!loading && <ForcesNetwork dimensionsW={width} dimensionsH={height+200} comingData={mainNode} />}
      {/* {!loading && <CorruptosVisuals dimensionsW={width} dimensionsH={height+200} comingData={mainNode} />} */}
      </div>
  );
}

export default NftVisuals;