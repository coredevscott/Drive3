export default function Purpose() {
  return (
    <div className="relative py-24 text-white bg-transparent sm:py-32">
      <img src="./img/purpose-bg-gradient-img.png" className="absolute top-0 left-0"></img>
      <img src="./img/star2.png" className="absolute hidden w-16 h-16 left-60 sm:block top-1/3"></img>
      <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
        <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex justify-center">
                <img
                    src="../img/purpose1.png"
                    alt="Product screenshot"
                    className="w-[18rem] max-w-none sm:w-[20rem] relative md:-ml-4 lg:-ml-0"
                />
            </div>
            <div className="lg:pr-8 lg:pt-4">
                <div className="text-left lg:max-w-lg">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Our process</p>
                    <p className="mt-6 leading-8 text-[#898CA9] text-sm">
                        Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, 
                    </p>
                    <button className='px-8 py-3 mt-6 text-sm font-medium text-white bg-transparent border border-white rounded-md w-36'>Read More</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
