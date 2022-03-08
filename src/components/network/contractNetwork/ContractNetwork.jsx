import React,{useState, useRef, useEffect, memo} from 'react';
import colorbrewer from 'colorbrewer'
import * as d3 from 'd3';
import useCsv from '../../hook/useCsv'
// import './ContractNetwork.css'

function NftChart({ name }) {
  const currentRef = useRef()
  const {data, loading, error} = useCsv(`/${name}.csv`)
  const [dataKeys, setDataKeys] = useState()
  const [loadingKeys, setLoading] = useState(true)
  const [w,h] = [1000, 900]

  const nodeHash = {}
  const newMethod = []
  useEffect(() => {
    if(!data) return 
      const arr = []
     console.log(data)

      for(const [key, value] of data) {
         arr.push(key)
        setDataKeys( arr )
        if(key.includes( "Atomic Match_") ){
          newMethod.push( value.map(d => d.Txhash) )

        }
     }


     console.log(newMethod)
     setLoading(false)


      return () => {}
  },[name])  

  return (
    <div>
      <div>
        {!loadingKeys && <List data={dataKeys} />}
      </div>
      <svg ref={currentRef} width={w} height={h} />
    </div>
  );
}


function List({ data= [] }){
  if(!data)return 
  return (
    <select id="methods-options">
      {
        data.map( d => 
          <option key={d} value={d}> {d} </option>
        )
      }
    </select>
  )
}

function ContractNetwork(){
  const [name, setName] = useState('invisibleFriends4')
  return <NftChart name={name}/>
}
export default ContractNetwork;
