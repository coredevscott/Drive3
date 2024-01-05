import '../../css/animations.css';

const wallets = [
  {imgSrc: "./img/benefit1.png", title:"Wallet Setup", content: "Qorem ipsum consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."}, 
  {imgSrc: "./img/benefit2.png", title:"Easy to connect", content:"Qorem ipsum consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."}, 
  {imgSrc: "./img/benefit3.png", title:"Get more profit", content:"Qorem ipsum dolor sit amet, consectetur adivulputate libero et velit interdum, ac aliquet odio mattis."}, 
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
            What are the Benefits you can get in Ethdrive
          </h2>
          <div className="max-w-xl text-[#898CA9]">Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</div>
          <button className='px-10 py-4 font-medium text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]'>Join Now</button>
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
                        <div className='text-purple-400 cursor-pointer'>View details</div>
                    </div>
                ))
            }
          </div>
        </div>
      </div>
    )
}
