import React,{useState, useEffect} from 'react';
import ForcesNetwork from '../network/forcesNetwork/ForcesNetwork';
// import CleanData from '../cleanData/CleanData';
import * as d3 from 'd3';
import useWindowSize from '../Events/WindowSize';
import './Draw.css'

function Draw() {
  const [mainNode, setMainNode] = useState([])
  const [loading, setLoading] = useState(true)

  const [width, height] = useWindowSize()
// 
//           links.set('id',d.From)
//           links.set('to', d.To) 
//           links.set('BlockNumber', +d['Blockno'])   
//           links.set('TxnFee', parseFloat(d['TxnFee(USD)']) )
//           links.set('Method', d['Method'] )
//           links.set('Unix Time' ,  new Date(+d['UnixTimestamp'] * 1000) )
//           links.set('ContractAddress' , d['ContractAddress'] )
//           links.set('Status' , d['Status'] )
//           links.set('Value_IN(ETH)',  parseFloat(['Value_IN(ETH)']) )
//           links.set('Value_OUT(ETH)',parseFloat( d['Value_OUT(ETH)']) )

  useEffect(() => {
    d3.csv('invisibleFriends.csv').then( (data,error) =>{

      const nodes = data.map( (d,i) => {
        const node = {}
          node['id']= d.From
          node['BlockNumber']= +d['Blockno']      
          node['TxnFee']= parseFloat(d['TxnFee(USD)'])
          node['Method']= d['Method']
          node['DateTime'] = d['DateTime']
        // if(i < 100) return node
          return node
      })
      setMainNode(nodes)
      setLoading(false)
    return () => {}
    }).catch(console.error)
  },[])  
//  
//   useEffect(() => {
//     d3.csv('player2.csv').then( (data,error) =>{
// 
//         const nodes = new Set()
//         const newNodes = data.map( (d,i) => {
//         const links = {}
//         let name = ''
//           links.id = d.From
//           links.to =  d.To
//           // links.set('BlockNumber', +d['Blockno'])   
//           links.valueUSD = parseFloat( d['TxnFee(USD)'])
//           links['Method']= d['Method'] 
//           // links.set('Unix Time' ,  new Date(+d['UnixTimestamp'] * 1000) )
//           // links.set('ContractAddress' , d['ContractAddress'] )
//           // links.set('Status' , d['Status'] )
//           links['Value_IN(ETH)'] = parseFloat( d['Value_IN(ETH)'] )
//           links['targetETH'] = parseFloat( d['Value_OUT(ETH)'])
//           
//           // if( !links.has(d['Method'] ) ){
//           //   Method =  nodes.add( d['Method'] )  
//           // }
//           name = d['Method']
//         // if(i < 100) return links
//           return links
//       })
//       setMainNode(newNodes)
//       setLoading(false)
//     return () => {}
//     }).catch(console.error)
//   },[mainNode])  

  return (
    <div id="drawing">
      {loading && <h3>Loading.....</h3> }
      {!loading && <ForcesNetwork dimensionsW={width} dimensionsH={height+200} comingData={mainNode} />}
      {/* {!loading && <CleanData dimensionsW={width} dimensionsH={height+200} comingData={mainNode} />} */}
    </div>
  );
}

export default Draw;
