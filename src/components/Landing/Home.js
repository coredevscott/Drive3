import '../../css/animations.css';
import { FaXTwitter } from "react-icons/fa6";
import { PiTelegramLogo } from "react-icons/pi";
import { FiGithub } from "react-icons/fi";
import { Link } from 'react-router-dom';

const wallets = [
  {imgSrc: "./img/wallet1.png"}, 
  {imgSrc: "./img/wallet2.png"}, 
  {imgSrc: "./img/wallet3.png"}, 
  {imgSrc: "./img/wallet4.png"},
  {imgSrc: "./img/wallet5.png"}, 
  {imgSrc: "./img/wallet6.png"},
  {imgSrc: "./img/wallet7.png"},
  {imgSrc: "./img/wallet8.png"}
];

export default function Home() {
    return (
      <div className="relative z-0 py-24 text-white bg-transparent fadeInUp sm:py-32">
        <div className="flex flex-col items-center justify-center gap-10 px-6 mx-auto max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold text-center sm:text-7xl">
            Interactive storage application compactible with multiple networks
          </h2>
          <div className="max-w-xl text-[#898CA9]">On Drive3, security and privacy are not a choice, but a standard. Everyone can securely store data privately by online.</div>
          <Link to="/storage"><button className='px-10 py-4 font-medium text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]'>Get Started</button></Link>
          <div className="grid items-center max-w-lg grid-cols-2 mx-auto mt-10 sm:grid-cols-4 gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-8">   
            {
                wallets.map((item) => (
                  <div className="hover:translate-y-[-10px] transition-transform duration-700 bg-[#161619] p-5 flex justify-center rounded-md">
                    <img
                      className="object-contain w-auto col-span-2 max-h-24 lg:col-span-1"
                      src={item.imgSrc}
                      alt="Transistor"
                    />
                </div>
                ))
            }
          </div>
          <div className='flex flex-row gap-5 text-white'>
            <a href="https://twitter.com/ethdrive_net" target="_blank"><FaXTwitter className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/></a>
            <a href="https://t.me/ethdriveglobal" target="_blank"><PiTelegramLogo className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/></a>
            <a href="https://github.com/ethdriveio/ethdriveui.git" target="_blank"><FiGithub  className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/></a>
          </div>
        </div>
      </div>
    )
}
