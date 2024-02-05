import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { LuUserCircle2 } from "react-icons/lu";
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../css/drive3.css';
import '../../css/animations.css';

import { useContext } from 'react'
import MyContext from '../../MyContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const {refreshStorage, setRefreshStorage, authToken, setAuthToken, signed, setSigned, network, setNetwork, address, setAddress} = useContext(MyContext);
  const [showModal, setShowModal] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);

  useEffect(() => {
    window.onclick = function(event) {
      var modal = document.getElementById("myModal");

      if (event.target == modal) {
        setShowModal(0);
      }
    }
  }, []);

  useEffect(() => {
    if(signed == 1 && authToken != "") {
      console.log('-----query file storage request-----');
      console.log(authToken);

      const request_headers = {
        'Authorization': 'Bearer ' + authToken
      };

      axios.get('https://api.mefs.io:10000/produce/mefs/storageinfo?stype=mefs',
        {headers: request_headers}
      )
      .then((response) => {
        console.log('-----query file storage respoinse-----');
        console.log(response);

        setUsedStorage(response.data.Used);
      })
      .catch((error) => {
          console.error(error);

          setUsedStorage(0);
      });
    }
  }, [authToken, refreshStorage]);

  return (
    <Disclosure as="nav" className="relative bg-transparent fadeIn">
      {({ open }) => (
        <>
          <div className="relative px-2 py-4 mx-auto cursor-pointer max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center justify-between flex-1 mx-5 sm:items-stretch">
                <Link to='/'><div className="flex flex-row items-center flex-shrink-0 gap-4">
                  {/* <a href="/"> */}
                    <img
                      className="w-auto cursor-pointer h-7"
                      src="./img/drive3.png"
                      alt="My logo"
                    />
                    <div className='text-2xl font-semibold text-white'>Drive 3</div>
                  {/* </a> */}
                </div></Link>
                <div className='relative flex flex-row items-center justify-center mr-5 font-medium gap-7'>
                    <a href="https://ethdrive.net/docs/#/EthDrive" target='_blank'><div className='px-2 py-1 text-white border-white rounded-md'>Docs</div></a>
                    <LuUserCircle2 onClick={() => setShowModal(1 - showModal)} className='w-8 h-8 text-white'/>
                </div>
              </div>
              {showModal == 1 ? (<div className='absolute z-10 p-5 text-gray-700 bg-white right-5 fadeIn top-14 rounded-xl'>
                  <div className='flex flex-row items-center justify-center gap-3'>
                    <LuUserCircle2 className='w-5 h-5'/>
                    <p>{address.slice(0, 9) + '...' + address.slice(address.length - 8, address.length)}</p>
                  </div>
                  <div className='mt-4'>{(usedStorage / 1024 / 1024) >= 1 ? (usedStorage / 1024 / 1024).toFixed(0) + 'MB/10GB' : (usedStorage / 1024).toFixed(0) + 'KB/10GB'}</div>
                  <div className='mt-4 text-sm'>Current Version: 2.0</div>
                  <Link to='/'><div className='mt-4 text-sm font-semibold'>Log out</div></Link>
                </div>) : (<div></div>)}      
              {showModal == 1 && (<div id="myModal" class="modal"></div>)}   
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
