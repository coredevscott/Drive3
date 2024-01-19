import * as React from 'react'
import '../css/drive3.css'
import '../css/animations.css';

import Header from './Storage/Header';
import MyFiles from './Storage/MyFiles';

function StorageManage () {
    return (
      <div className="App relaitve bg-[#0B0B0F] h-screen overflow-hidden">
        {/* Background images */}
        <img src='./img/bg-gradient-img1.png' className='absolute top-0 left-0'></img>
        <img src="./img/bg-gradient-img2.png" className='absolute bottom-0 right-0'></img>
        <img src="./img/bg-img.png" className='h-screen absolute top-[-20px] left-0'></img>
        <img src="./img/star1.png" className='absolute hidden fadeIn lg:block right-40 top-1/4 w-14 h-14'></img>
        <img src="./img/star2.png" className='absolute hidden w-20 h-20 fadeIn lg:block left-40 bottom-1/4'></img>
        <img src="./img/star3.png" className='absolute hidden fadeIn lg:block left-20 bottom-1/3 w-14 h-14'></img>

        {/* Main sections */}
        <Header />
        <MyFiles />
      </div>
    );
}

export default StorageManage;
