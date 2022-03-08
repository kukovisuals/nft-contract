import React from 'react';
import MenuButton from '../components/MenuButton/MenuButton';
import Home from '../components/Home/Home';

import {ParallaxProvider} from 'react-scroll-parallax';

function HomePage (){
  	return (
		<div className="homePage">
      <MenuButton/>
      <ParallaxProvider>
        <Home/>   		
      </ParallaxProvider>
    </div>
   
	)
}

export default HomePage;