import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { LuUserCircle2 } from "react-icons/lu";
import axios from 'axios';


import '../../css/drive3.css';
import '../../css/animations.css';

import { useContext } from 'react'
import MyContext from '../../MyContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const {authToken, setAuthToken, signed, setSigned, network, setNetwork, address, setAddress} = useContext(MyContext);
  const [showModal, setShowModal] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);

  useEffect(() => {
    if(signed == 1 && authToken != "") {
      console.log('-----query file storage request-----');

      const request_headers = {
        'Authorization': 'Bearer ' + authToken
      };

      axios.get('https://api.mefs.io:10000/test/mefs/storageinfo',
        {headers: request_headers}
      )
      .then((response) => {
        console.log('-----query file storage respoinse-----');
        console.log(response);

        setUsedStorage(response.data.Used);
      })
      .catch((error) => {
          console.error(error); 
      });
    }
  }, [authToken]);

  return (
    <Disclosure as="nav" className="relative bg-transparent fadeIn">
      {({ open }) => (
        <>
          <div className="relative px-2 py-4 mx-auto cursor-pointer max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-between">
                <div className="flex items-center flex-shrink-0">
                  {/* <a href="/"> */}
                    <img
                      className="hidden w-auto cursor-pointer sm:block h-7"
                      src="./img/logo.png"
                      alt="My logo"
                    />
                  {/* </a> */}
                </div>
                <div className='relative flex flex-row items-center justify-center font-medium gap-7'>
                    <div className='px-2 py-1 text-white border-white rounded-md'>Docs</div>
                    <LuUserCircle2 onClick={() => setShowModal(1 - showModal)} className='w-8 h-8 text-white'/>
                    {showModal == 1 ? (<div className='absolute right-0 z-10 p-5 text-gray-700 bg-white fadeIn top-10 rounded-xl'>
                      <div className='flex flex-row items-center justify-center gap-3'>
                        <LuUserCircle2 className='w-5 h-5'/>
                        <p>{address.slice(0, 20) + '...'}</p>
                      </div>
                      <div className='mt-4'>{(usedStorage / 1024 / 1024).toFixed(0)}MB/10GB</div>
                      <div className='mt-4 text-sm'>Current Version: 2.0</div>
                    </div>) : (<div></div>)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
