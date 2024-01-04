import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa";

import '../../css/drive3.css';
import '../../css/animations.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="relative bg-transparent fadeInDown">
      {({ open }) => (
        <>
          <div className="relative px-2 py-4 mx-auto cursor-pointer max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-between">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="hidden w-auto sm:block h-7"
                    src="./img/logo.png"
                    alt="My logo"
                  />
                </div>
                <div className='flex flex-row items-center font-medium gap-7'>
                    <div className='hidden text-white sm:block'>Docs</div>
                    <div className='flex flex-row items-center gap-3 px-3 py-[6px] text-white border border-white rounded-md'>
                        <img src="./img/ethereum.png" className='w-4 h-4'></img>
                        Ethereum ...
                        <FaAngleDown className='w-4 h-4 text-white'/>
                    </div>
                    <div className='px-5 py-[8px] text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]'>Connect Wallet</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
