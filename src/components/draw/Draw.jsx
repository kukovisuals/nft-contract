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
  },[mainNode])  
 
//   useEffect(() => {
//     d3.csv('player1.csv').then( (data,error) =>{
// 
//       const nodes = data.map( (d,i) => {
//         const node = new Map()
//         
//         let Method = ''
//           node.set('id',d.From)
//           node.set('to', d.To) 
//           node.set('BlockNumber', +d['Blockno'])   
//           node.set('TxnFee', parseFloat(d['TxnFee(USD)']) )
//           node.set('Method', d['Method'] )
//           node.set('Unix Time' ,  new Date(+d['UnixTimestamp'] * 1000) )
//           node.set('ContractAddress' , d['ContractAddress'] )
//           node.set('Status' , d['Status'] )
//           node.set('Value_IN(ETH)',  parseFloat(['Value_IN(ETH)']) )
//           node.set('Value_OUT(ETH)',parseFloat( d['Value_OUT(ETH)']) )
//           
//           Method =  d['Method']  
//         // if(i < 100) return node
//           return {node, Method}
//       })
//       setMainNode(nodes)
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
