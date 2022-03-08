const Manager = [
  {method: "Mint Listed", From: '2342', To:'2254s', Txhash:'fa34'},
  {method: "Atomic Match", From: 'y56', To:'566h', Txhash:'af34'},
  {method: "Close Swap Intent", From: 'h5hf5', To:'2254s', Txhash:'4tsd3'},
  {method: "Safe intent Transform", From: '5h56', To:'2254s', Txhash:'354'},
  {method: "Mint Listed", From: 'j65', To:'sdfc', Txhash:'fa3'},
  {method: "Mint Listed", From: '53f', To:'dfg', Txhash:'f34'},
  {method: "Proxy match", From: 'asd', To:'765', Txhash:'3f4'},
  {method: "Proxy match", From: '000', To:'xdfs', Txhash:'24trr'},
  {method: "Proxy match", From: '111111', To:'xcf8', Txhash:'a43'},
]

const hash = {}
  let arr = []
const play = Manager.map(d => {
  hash[ d['method']] = []
 
  return hash
})
console.log( hash ) 
function elements(data){
  arr.push({
    from: data.From,
    To: data.To,
    Txhash: data.Txhash
  })
  return arr
}

