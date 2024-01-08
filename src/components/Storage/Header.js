import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa";
import { PiUserCircleGearDuotone } from "react-icons/pi";

import '../../css/drive3.css';
import '../../css/animations.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <Disclosure as="nav" className="relative bg-transparent fadeIn">
      {({ open }) => (
        <>
          <div className="relative px-2 py-4 mx-auto cursor-pointer max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-between">
                <div className="flex items-center flex-shrink-0">
                  <a href="/">
                    <img
                      className="hidden w-auto sm:block h-7"
                      src="./img/logo.png"
                      alt="My logo"
                    />
                  </a>
                </div>
                <div className='flex flex-row items-center justify-center font-medium gap-7'>
                    <div className='px-2 py-1 text-white border border-white rounded-md'>Docs</div>
                    <PiUserCircleGearDuotone  className='w-10 h-10 text-white'/>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
