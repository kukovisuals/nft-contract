
import MenuButton from '../components/MenuButton/MenuButton';
import {  Link} from "react-router-dom";
// import NftVisuals from '../components/NftVisuals/NftVisuals';
// import StockMarketApp from '../components/StockMarketApp/StockMarketApp';
// import CorruptosVisuals from '../components/CorruptosVisuals/CorruptosVisuals';

import useWindowSize from '../components/Events/WindowSize';

import {IMG_DATA} from '../data/imagesData';

import {ParallaxProvider} from 'react-scroll-parallax';
import {Parallax} from 'react-scroll-parallax';

function DataVisuals() {

  const [x, y] = useWindowSize()
  return (
    <div className="DataVisuals">
     <MenuButton/> 
      <ParallaxProvider>
        {x < 600 ? 
          (
            <HomeMobile/>
          ) : 
          (
            <HomeDesktop/>
           ) 
         }
      </ParallaxProvider>
    </div>
  );
}


const HomeMobile = () => (
  <div>
    <Parallax 
        translateY={[10, 150]}
        className="homePage-inner-container"
        >
      {
        <Link to="invisibleFriendsNFT">
          <img className="homepage-img" id={ `img-${IMG_DATA[0].id}` } key={IMG_DATA[0].id} src={IMG_DATA[0].img} alt="nft-visuals"/>
        </Link>
      }
      </Parallax>
      <Parallax 
      translateY={[20, 180]}
      className="homePage-inner-container">
      {
        <Link to="corruptionColombia">
          <img className="homepage-img" id={ `img-${IMG_DATA[1].id}` }  key={IMG_DATA[1].id} src={IMG_DATA[1].img} alt="colombia-corruptos"/>
        </Link>
      }
      </Parallax>
      <Parallax 
      translateY={[10, 220]}
      className="homePage-inner-container">
      {
        <Link to="stockMarket">
          <img className="homepage-img" id={ `img-${IMG_DATA[2].id}` } key={IMG_DATA[2].id} src={IMG_DATA[2].img} alt="stock-market-chart"/>
        </Link>
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
        <Link to="invisibleFriendsNFT">
          <img className="homepage-img" id={ `img-${IMG_DATA[0].id}` } key={IMG_DATA[0].id} src={IMG_DATA[0].img} alt="nft-visuals"/>
        </Link>
      }
      </Parallax>
      <Parallax 
      translateY={[100, 100]}
      className="homePage-inner-container">
      {
        <Link to="corruptionColombia">
          <img className="homepage-img" id={ `img-${IMG_DATA[1].id}` }  key={IMG_DATA[1].id} src={IMG_DATA[1].img} alt="colombia-corruptos"/>
        </Link>
      }
      </Parallax>
      <Parallax 
      translateY={[100, 300]}
      className="homePage-inner-container">
      {
        <Link to="stockMarket">
          <img className="homepage-img" id={ `img-${IMG_DATA[2].id}` } key={IMG_DATA[2].id} src={IMG_DATA[2].img} alt="stock-market-chart"/>
        </Link>
      }
      </Parallax>
  </div>
)
export default DataVisuals;
