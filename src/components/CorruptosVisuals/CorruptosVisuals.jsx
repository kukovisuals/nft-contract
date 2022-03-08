import React from 'react'
// import * as d3 from 'd3'
import corruptosData from '../../data/corruptos.csv'

import BarChart from './BarChart/BarChart';
import GeoChart from './GeoChart/GeoChart';
import TotalBarChart from './TotalBarChart/TotalBarChart';
import MenuButton from '../MenuButton/MenuButton';

import './CorruptosVisuals.scss'

function CorruptosVisuals() {

  const colorPicker = ["#F7B2DD","#F576C6","#D44AA1","#F7029E","#FF0050","#E80C29","#FF1D23", "#FF0300", "#D40D12","#94090D", "#5C0002", "#BF0C00","#731010","#450003" ]
  
  return (
    <div className="charts-container">
      <MenuButton/>   
      <h1>Corruption In Colombia During The Pandemic 2020</h1>
      <h3>US dollars to Colombian Pesos</h3>
      <h4> $1 USD = $3,500</h4>
      <BarChart datos={corruptosData} colorPicker={colorPicker}/>
      <GeoChart datos={corruptosData} colorPicker={colorPicker} />

      <h3>Total damage from corruption</h3>
      <TotalBarChart colorPicker={colorPicker} />
    </div>
  );
}

export default CorruptosVisuals;
