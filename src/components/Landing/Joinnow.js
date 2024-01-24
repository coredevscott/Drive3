export default function Joinnow() {
    return (
      <div className="relative py-24 text-white bg-transparent sm:py-32">
        <img src="../img/joinnow-bg-gradient-img.png" className="absolute top-0 right-0 transform -translate-y-1/3"></img>
        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">        
              <div className="lg:pr-8 lg:pt-4">
                  <div className="text-left lg:max-w-lg">
                      <p className="max-w-lg mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">Take your first step, into safe, secure crypto network</p>
                      <p className="mt-6 leading-8 text-[#898CA9] text-md">
                        Select a suitable blockchain platform or decentralized file storage protocol that supports file storage capabilities. Examples include IPFS (InterPlanetary File System), Filecoin, Storj, or Sia.
                      </p>
                      <a href="https://t.me/ethdriveglobal" target="_blank"><button className='mt-6 px-10 py-4 font-medium text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]'>Join Now</button></a>
                  </div>
              </div>
              <div className="flex justify-center">     
                <img
                    src="../img/joinnow.png"
                    alt="Product screenshot"
                    className="w-[18rem] max-w-none sm:w-[30rem] relative md:-ml-4 lg:-ml-0"
                />
              </div>
          </div>
        </div>
      </div>
    )
}
