// import data from './data/fakeContract.json';
import data from './data/contracts.json';

function VerifyContract() {
  
  const NFTObj = {
    contract: data[0].result[0].ContractName
  }
  const abiName = []
  const sourceCode = (data[0].result[0].SourceCode).replace(/[\W_]+/g," ")
 
  if(!NFTObj.contract) return <h1> No Contract !!! </h1>
  
  JSON.parse(data[0].result[0].ABI).map( x =>   abiName.push(x.name) )
  console.log(data)
  return (
    <div className="verifyContract">
      <h1>Contract Verification:  {NFTObj.contract} </h1>
      <h2>ABI names:</h2>
      <List data={abiName} /> 
      <h2>Source Code</h2>
      <p>{sourceCode}</p>
    </div>
  );
}


function List({data}){
  if(!data) return
  return (
    <ul>
      {data.map( (x,i) => <li key={i}> {x} </li> )}
    </ul>
  )
}
export default VerifyContract;
