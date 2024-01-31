import '../../css/animations.css';

const wallets = [
  {imgSrc: "./img/benefit1.png", title:"Wallet Setup", content: "Blockchain-based file storage systems often require users to set up a digital wallet to access the storage network. This wallet serves as a secure gateway for managing files and transactions."}, 
  {imgSrc: "./img/benefit2.png", title:"Easy to connect", content:" Blockchain-based file storage often employs peer-to-peer (P2P) networking, enabling direct and efficient file sharing between users. This eliminates the need for intermediaries or centralized servers, making it easier to connect and share files."}, 
  {imgSrc: "./img/benefit3.png", title:"Get more profit", content:"Users participating in the blockchain file storage network may receive tokens or cryptocurrencies as rewards for contributing their storage space or resources. These tokens can have monetary value and can be traded or exchanged for other assets, potentially leading to financial gains."}, 
];

export default function Benefits() {
    return (
      <div className="relative py-24 text-white bg-transparent fadeInUp sm:py-32">
        <img src="../img/benefit-bg-img.png" className='absolute right-0 top-1/2'></img>
        <img src="../img/star1.png" className='absolute hidden sm:block w-14 h-14 right-60 top-1/3'></img>
        <img src="../img/star3.png" className='absolute hidden w-12 h-12 sm:block left-20 bottom-1/4'></img>
        <img src="../img/star2.png" className='absolute hidden w-16 h-16 sm:block left-40 bottom-1/3'></img>
        
        <div className="relative flex flex-col items-center justify-center gap-10 px-6 mx-auto max-w-7xl lg:px-8">
          <h2 className="max-w-2xl text-3xl font-bold text-center sm:text-5xl">
            What are the Benefits you can get in Drive3
          </h2>
          <div className="max-w-xl text-[#898CA9]">We believe in revolutionizing industries, enhancing security, and providing unparalleled opportunities for our users.</div>
          <a href="https://t.me/ethdriveglobal" target="_blank"><button className='px-10 py-4 font-medium text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]'>Join Now</button></a>
          <div className="grid items-center max-w-lg grid-cols-1 mx-auto mt-10 gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none sm:grid-cols-3">   
            {
                wallets.map((item) => (
                    <div className="flex flex-col gap-5 text-white hover:translate-y-[-10px] transition-transform duration-700 bg-[#161619] p-7 justify-center rounded-xl">
                        <img
                        className="object-contain w-auto col-span-2 max-h-24 lg:col-span-1"
                        src={item.imgSrc}
                        alt="Transistor"
                        />
                        <div className='text-2xl font-semibold'>{item.title}</div>
                        <div className='text-[#898CA9]'>{item.content}</div>
                        {/* <div className='text-purple-400 cursor-pointer'>View details</div> */}
                    </div>
                ))
            }
          </div>
        </div>
      </div>
    )
}
