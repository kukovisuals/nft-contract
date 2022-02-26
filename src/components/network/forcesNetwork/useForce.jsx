
import colorbrewer from 'colorbrewer'
import * as d3 from 'd3';
// const initialState = {
// 	isRunning: false,
// 	time: 0
// }

// function reducer2(state, action) {
//   switch (action.type) {
//     case 'start':
//       return { ...state, isRunning: true };
//     case 'stop':
//       return { ...state, isRunning: false };
//     case 'reset':
//       return { isRunning: false, time: 0 };
//     case 'tick':
//       return { ...state, time: state.time + 1 };
//     default:
//       throw new Error();
//   }
// }

export default function UseFore(state,action){
   switch(action.type){
    case "Owner Mint":          
      const a = state.filter( d => d.Method === "Owner Mint")
      
      const mxTx1 = d3.max(a, d=> d.TxnFee)
      const col1 = d3.scaleQuantize().domain([0,mxTx1]).range(colorbrewer.Blues[9])
      const yScl1 = d3.scaleLinear().domain([0, mxTx1]).range([0,25])
    
      return {
				...state,	
 				id: state.id,maxTxn: state.maxTxn, transaction_fee: state.TxnFee, radius: yScl1(state.TxnFee), color: col1(state.TxnFee)
      } 
    case "Set Provenance Hash": 
      const b = state.filter( d => d.Method === "Set Provenance Hash")

      const mxTx2 = d3.max(b, d=> d.TxnFee)
      const col2 = d3.scaleQuantize().domain([0,mxTx2]).range(colorbrewer.Blues[9])
      const yScl2 = d3.scaleLinear().domain([0, mxTx2]).range([0,25])
    
      return {
				...state,	
 				id: state.id,maxTxn: state.maxTxn, transaction_fee: state.TxnFee, radius: yScl2(state.TxnFee), color: col2(state.TxnFee)
      } 
      break;
    case "Set Approval For All": 
     const c = state.filter( d => d.Method === "Set Approval For All")

      const mxTxn3 = d3.max(c, d=> d.TxnFee)
      const col3 = d3.scaleQuantize().domain([0,mxTxn3]).range(colorbrewer.Blues[9])
      const yScal3 = d3.scaleLinear().domain([0, mxTxn3]).range([0,25])
    
      return {
				...state,	
 				id: state.id,maxTxn: state.maxTxn, transaction_fee: state.TxnFee, radius: yScal3(state.TxnFee), color: col3(state.TxnFee)
      }         
      break;
    case "Mint Listed":          
      const d = state.filter( d => d.Method === "Mint Listed")

      const mxTxn4 = d3.max(d, d=> d.TxnFee)
      const col4 = d3.scaleQuantize().domain([0,mxTxn4]).range(colorbrewer.Blues[9])
      const yScal4 = d3.scaleLinear().domain([0, mxTxn4]).range([0,25])
    
      return {
				...state,	
 				id: state.id,maxTxn: state.maxTxn, transaction_fee: state.TxnFee, radius: yScal4(state.TxnFee), color: col4(state.TxnFee)
      } 
      break;
    case "Set Active":           
      const e = state.filter( d => d.Method === "Set Active")

      const mxTx5 = d3.max(e, d=> d.TxnFee)
      const col5 = d3.scaleQuantize().domain([0,mxTx5]).range(colorbrewer.Blues[9])
      const yScal5 = d3.scaleLinear().domain([0, mxTx5]).range([0,25])
    
      return {
				...state,	
 				id: state.id,maxTxn: state.maxTxn, transaction_fee: state.TxnFee, radius: yScal5(state.TxnFee), color: col5(state.TxnFee)
      }          
      break;
      default:
      	throw new Error();
  }
}
// 
// function sdfs() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const idRef = useRef(0);
// 
//   useEffect(() => {
//     if (!state.isRunning) { 
//       return; 
//     }
//     idRef.current = setInterval(() => dispatch({type: 'tick'}), 1000);
//     return () => {
//       clearInterval(idRef.current);
//       idRef.current = 0;
//     };
//   }, [state.isRunning]);
//   
//   return (
//     <div style={{width: '100%'}}>
//      	<div style={{float: 'right'}}>
//      		 {state.time}s
//      	</div>
//       <button onClick={() => dispatch({ type: 'start' })}>
//         Start
//       </button>
//       <button onClick={() => dispatch({ type: 'stop' })}>
//         Stop
//       </button>
//       <button onClick={() => dispatch({ type: 'reset' })}>
//         Reset
//       </button>
//     </div>
//   );
// }