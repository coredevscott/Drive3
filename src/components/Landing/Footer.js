export default function Footer() {
    return (
      <div className="relative pb-6 overflow-hidden sm:pb-10">
        <div className="flex flex-col items-center justify-center gap-5 px-6 mx-auto sm:justify-between sm:flex-row max-w-7xl lg:px-8">
              <div className="flex-row items-center flex-shrink-0 hidden gap-4 sm:flex">
                    <img
                      className="w-auto cursor-pointer h-7"
                      src="./img/drive3.png"
                      alt="My logo"
                    />
                    <div className='text-2xl font-semibold text-white'>Drive 3</div>
              </div>
            <p className="text-[#B3B1B1]">© 2024 Drive3, All Rights Reserved</p>
        </div>
      </div>
    )
}
