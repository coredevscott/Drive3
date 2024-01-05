import * as React from 'react'
import '../css/drive3.css'
import '../css/animations.css';

import Navbar from './Landing/Navbar';
import Home from './Landing/Home';
import Benefits from './Landing/Benefits';
import Purpose from './Landing/Purpose';
import People from './Landing/People';
import Joinnow from './Landing/Joinnow';
import Subscribe from './Landing/Subscribe';
import Footer from './Landing/Footer';

function Landing () {
    return (
      <div className="App relaitve bg-[#0B0B0F] h-full">
        {/* Background images */}
        <img src='./img/bg-gradient-img1.png' className='absolute top-0 left-0'></img>
        <img src="./img/bg-gradient-img2.png" className='absolute bottom-0 right-0'></img>
        <img src="./img/bg-img.png" className='absolute top-0 left-0'></img>
        <img src="./img/star1.png" className='absolute hidden fadeIn lg:block left-40 top-1/3 w-14 h-14'></img>
        <img src="./img/star2.png" className='absolute hidden w-20 h-20 fadeIn lg:block right-60 top-1/4'></img>
        <img src="./img/star3.png" className='absolute hidden fadeIn lg:block right-40 top-1/3 w-14 h-14'></img>

        {/* Main sections */}
        <Navbar />
        <Home />
        <Benefits />
        <Purpose />
        <People />
        <Joinnow />
        <Subscribe />
        <Footer />
      </div>
    );
}

export default Landing;
