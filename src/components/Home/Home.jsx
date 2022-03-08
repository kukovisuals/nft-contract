import {useState} from 'react';
import { Link } from "react-router-dom";
import {Parallax} from 'react-scroll-parallax';
import useWindowSize from '../Events/WindowSize';
import './Home.scss'
import {IMG_DATA} from '../../data/imagesData';

function Home (){
  const [location, setLocation] = useState()
  const handleBottom = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
   }
  return (
  <div>
    <Display/>  
    <div className="bringUp" onClick={handleBottom}>
      <span className="bringUp-span"> &uarr;</span>
    </div>
  </div>
 
  )
}
const Display = () => {

  const [x, y] = useWindowSize()
// 
//   console.log(x, y)
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