import {useState,  useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import {Parallax} from 'react-scroll-parallax';
import useWindowSize from '../Events/WindowSize';
import './Home.scss'
import {IMG_DATA} from '../../data/imagesData';

import * as d3 from 'd3';

function Home (){
  const [location, setLocation] = useState()
  const handleBottom = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
   }

  const currentRef = useRef()


  useEffect(()=> {
  
    d3.json('https://data.ny.gov/resource/6nbc-h7bj.json').then( dataset =>{
      draw(dataset)
    })
    

  },[])

  function draw(data){
    
    console.log(data)
const svg = currentRef.current

    const timeDomain = data.map( d => d.draw_date)
  
    let blue = "#5EE3E6",  orange = "#FF00CB", backgroundColor = "#282c34"
    const xScale = d3.scaleBand().domain(timeDomain).range([ 0, 1400 ]);
    const yScale = d3.scaleLinear().domain([0, 50]).range([ 700, 0 ])
    
    const xAxis = d3.axisBottom(xScale).tickSize(1400).tickValues(timeDomain.filter((d,i)=> i%3===0 )) 
    const yAxis = d3.axisRight(yScale).tickSize(700)

    // clean the svg canvas
    d3.select(svg).append('g')
      .selectAll("rect")
      .data(data)                                                     
      .enter()
      .append("rect")
      .attr("x",0)
      .attr("y",0)        
      .attr('width', 1400)
      .attr('height', 700)                      
      .style("fill", backgroundColor)

    // bottom x Axis
    d3.select(svg).append('g').attr('id', 'xAxisG').call(xAxis)
    .selectAll('.tick line').attr('stroke', '#474E5C')
    // rigth y Axis
    d3.select(svg).append("g").attr("id", "yAxisG").call(yAxis)
    .selectAll('.tick line').attr('stroke', '#8B99B5')

    d3.select(svg).append('g').attr('class', 'drawCircles')
      .selectAll("circle.highs")
      .data(data)                                                     
      .enter()
      .append("circle")
      .attr("class", "highs")
      .attr("r", 5)
      .attr("cx", d => xScale(d.draw_date))
      .attr("cy", d =>  d.winning_numbers.split(' ').map(x => yScale(+x) ) )                              

      .style("fill", blue)
    /*
    d3.select(svg).append('g').attr('class', 'drawCircles')
    .selectAll("circle.lows")
      .data(data)                                                     
      .enter()
      .append("circle")
      .attr("class", "lows")
      .attr("r", 5)
      .attr("cx", d => xScale(d.minute))
      .attr("cy", d => yScale(d.low))                            
      .style("fill", orange)

   const lambdaXScale = d => xScale(d.minute)

      const highLine = d3.line()
        .x(lambdaXScale)
        .y(d => yScale(d.high))
      const lowLine = d3.line()
        .x(lambdaXScale)
        .y(d => yScale(d.low))

      d3.select(svg).append('g').attr('class', 'drawCircles')
        .append("path")                              
        .attr("d", highLine(data))
        .attr("fill", "none")
        .attr("stroke", blue)
        .attr("stroke-width", 2)
      d3.select(svg).append('g').attr('class', 'drawCircles')
        .append("path")
        .attr("d", lowLine(data))
        .attr("fill", "none")
        .attr("stroke", orange)
        .attr("stroke-width", 2)
        */
  }

  return (
  <div>
  <div>
    {/* <svg ref={currentRef} width="1400" height="700" /> */}
  </div>
    <Display/>  
    <div className="bringUp" onClick={handleBottom}>
      <span className="bringUp-span"> &uarr;</span>
    </div>
  </div>
 
  )
}
const Display = () => {
  const [x, y] = useWindowSize()

  return x < 600 ? (
    <HomeMobile/>
  ) : (
    <HomeDesktop/>
  )
}

const HomeMobile = () => (
  <div>
    <Parallax 
      translateY={[10, 150]}
      className="homePage-inner-container"
      >
    {
      <Link to="dataVisuals/invisibleFriendsNFT">
        <img className="homepage-img" id={ `img-${IMG_DATA[0].id}` } key={IMG_DATA[0].id} src={IMG_DATA[0].img} alt="nft-visuals"/>
      </Link>
    }
    </Parallax>
    <Parallax 
    translateY={[20, 180]}
    className="homePage-inner-container">
    {
      <Link to="dataVisuals/corruptionColombia">
        <img className="homepage-img" id={ `img-${IMG_DATA[1].id}` }  key={IMG_DATA[1].id} src={IMG_DATA[1].img} alt="colombia-corruptos"/>
      </Link>
    }
    </Parallax>
    <Parallax 
    translateY={[10, 220]}
    className="homePage-inner-container">
    {
      <Link to="dataVisuals/stockMarket">
        <img className="homepage-img" id={ `img-${IMG_DATA[2].id}` } key={IMG_DATA[2].id} src={IMG_DATA[2].img} alt="stock-market-chart"/>
      </Link>
    }
    </Parallax>
    <Parallax 
    translateY={[10, 150]}
    className="homePage-inner-container">
    {
      <a href="http://fivem.com">
        <img className="homepage-img" id={ `img-${IMG_DATA[3].id}` } key={IMG_DATA[3].id} src={IMG_DATA[3].img} alt="fivem-site"/>
      </a>
    }
    </Parallax>
    <Parallax 
    translateY={[5, 100]}
    className="homePage-inner-container">
    {
      <a href="https://halloffameltd.com/">
      <img className="homepage-img" id={ `img-${IMG_DATA[4].id}` } key={IMG_DATA[4].id} src={IMG_DATA[4].img} alt="halloffame-site"/>
      </a>
    }
    </Parallax>
    <Parallax 
    translateY={[100, 100]}
    className="homePage-inner-container">
    {
      <a href="http://needscollective.com/">
      <img className="homepage-img" id={ `img-${IMG_DATA[5].id}` } key={IMG_DATA[5].id} src={IMG_DATA[5].img} alt="needs-collective"/>
      </a>
    }
    </Parallax>
  </div> 
)
const HomeDesktop = () => (
  <div>
    <Parallax 
      translateY={[100, -40]}
      className="homePage-inner-container"
      >
    {
      <Link to="dataVisuals/invisibleFriendsNFT">
        <img className="homepage-img" id={ `img-${IMG_DATA[0].id}` } key={IMG_DATA[0].id} src={IMG_DATA[0].img} alt="nft-visuals"/>
      </Link>
    }
    </Parallax>
    <Parallax 
    translateY={[100, 100]}
    className="homePage-inner-container">
    {
      <Link to="dataVisuals/corruptionColombia">
        <img className="homepage-img" id={ `img-${IMG_DATA[1].id}` }  key={IMG_DATA[1].id} src={IMG_DATA[1].img} alt="colombia-corruptos"/>
      </Link>
    }
    </Parallax>
    <Parallax 
    translateY={[100, 300]}
    className="homePage-inner-container">
    {
      <Link to="dataVisuals/stockMarket">
        <img className="homepage-img" id={ `img-${IMG_DATA[2].id}` } key={IMG_DATA[2].id} src={IMG_DATA[2].img} alt="stock-market-chart"/>
      </Link>
    }
    </Parallax>
    <Parallax 
    translateY={[100, 180]}
    className="homePage-inner-container">
    {
      <a href="http://fivem.com">
        <img className="homepage-img" id={ `img-${IMG_DATA[3].id}` } key={IMG_DATA[3].id} src={IMG_DATA[3].img} alt="fivem-site"/>
      </a>
    }
    </Parallax>
    <Parallax 
    translateY={[100, 100]}
    className="homePage-inner-container">
    {
      <a href="https://halloffameltd.com/">
      <img className="homepage-img" id={ `img-${IMG_DATA[4].id}` } key={IMG_DATA[4].id} src={IMG_DATA[4].img} alt="halloffame-site"/>
      </a>
    }
    </Parallax>
    <Parallax 
    translateY={[100, 180]}
    className="homePage-inner-container">
    {
      <a href="http://needscollective.com/">
      <img className="homepage-img" id={ `img-${IMG_DATA[5].id}` } key={IMG_DATA[5].id} src={IMG_DATA[5].img} alt="needs-collective"/>
      </a>
    }
    </Parallax>
  </div> 
)
export default Home;