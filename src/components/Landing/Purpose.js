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
                    <p className="mt-6 leading-8 text-[#898CA9] text-md">
                      1. Choosing a Blockchain Platform
                      <br></br>2. Wallet Setup
                      <br></br>3. File Preparation
                      <br></br>4. File Encryption
                      <br></br>5. File Upload
                      <br></br>6. Transaction Verification and Confirmation
                      <br></br>7. File Distribution and Storage
                      <br></br>8. Retrieval and Access
                    </p>
                    <a href="https://ethdrive.net/docs/#/EthDrive" target="_blank"><button className='px-8 py-3 mt-6 text-sm font-medium text-white bg-transparent border border-white rounded-md w-36'>Read More</button></a>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
