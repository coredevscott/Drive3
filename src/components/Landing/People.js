import '../../css/animations.css';

const wallets = [
  {imgSrc: "./img/people1.png", title:"Kathryn Murphy", content: "Total Tokens: $58,000 USDT", index: "01"}, 
  {imgSrc: "./img/people2.png", title:"Arlene McCoy", content:"Total Tokens: $58,000 USDT", index: "02"}, 
  {imgSrc: "./img/people3.png", title:"Dianne Russell", content:"Total Tokens: $58,000 USDT", index: "03"}, 
  {imgSrc: "./img/people4.png", title:"Jane Cooper", content: "Total Tokens: $58,000 USDT", index: "04"}, 
  {imgSrc: "./img/people5.png", title:"Cameron Williamson", content:"Total Tokens: $58,000 USDT", index: "05"}, 
  {imgSrc: "./img/people1.png", title:"Eleanor Pena", content:"Total Tokens: $58,000 USDT", index: "06"},
  {imgSrc: "./img/people2.png", title:"Courtney Henry", content: "Total Tokens: $58,000 USDT", index: "07"}, 
  {imgSrc: "./img/people3.png", title:"Kristin Watson", content:"Total Tokens: $58,000 USDT", index: "08"}, 
  {imgSrc: "./img/people4.png", title:"Devon Lane", content:"Total Tokens: $58,000 USDT", index: "09"},
];

export default function People() {
    return (
      <div className="relative z-0 py-24 text-white bg-transparent fadeInUp sm:py-32">
        <img src="../img/popular-bg-img.png" className='absolute top-0 right-0 transform -translate-y-1/3'></img>
        <img src="../img/bg-people-img2.png" className='absolute left-0 top-1/3'></img>
        
        <div className="relative flex flex-col items-center justify-center gap-10 px-6 mx-auto max-w-7xl lg:px-8">
          <h2 className="max-w-2xl text-3xl font-bold text-center sm:text-5xl">
            Popular People on Drive3
          </h2>
          <div className="max-w-xl text-[#898CA9]">Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</div>
          <div className='text-purple-400 cursor-pointer'>Learn more</div>
          <div className="grid items-center max-w-lg grid-cols-1 mx-auto mt-10 gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none sm:grid-cols-3">   
            {
                wallets.map((item) => (
                    <div className="flex flex-col gap-5 text-white hover:translate-y-[-10px] transition-transform duration-700 bg-[#161619] p-7 justify-center rounded-xl">
                        <div className='flex flex-row items-center gap-5'>
                          <img
                          className="object-contain w-auto col-span-2 max-h-16 lg:col-span-1"
                          src={item.imgSrc}
                          alt="Transistor"
                          />
                          <div className='text-xl font-semibold'>{item.title}</div>
                        </div>
                        
                        <div className='flex flex-row justify-between'>
                          <div className='text-[#898CA9]'>{item.content}</div>
                          <div className='text-purple-400 cursor-pointer'>{item.index}</div>
                        </div>                       
                    </div>
                ))
            }
          </div>
        </div>
      </div>
    )
}
