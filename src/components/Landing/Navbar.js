import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa";

import { useContext } from 'react'
import MyContext from '../../MyContext';

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import '../../css/drive3.css';
import '../../css/animations.css';

import NetworkSelect from './NetworkSelect';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const account = useAccount();
  const {signed, setSigned, network, setNetwork, address, setAddress} = useContext(MyContext);

  useEffect(() => {
    if(account.address)
      setSigned(1);
    else
      setSigned(0);
  }, [account.address]);

  const connectToUnisat = async () => {
    if (typeof window.unisat !== 'undefined') {
      try {
        let accounts = await window.unisat.requestAccounts();
        console.log('Unisat Wallet Connect Success!');

        let res = await window.unisat.getAccounts();
        setAddress(res[0]);
        setSigned(1);
      } catch (e) {
        console.log('connect failed');
      }
    }
    else{
      alert("Unisat Wallet does not installed!");
    }
  };

  return (
    <Disclosure as="nav" className="relative bg-transparent fadeInDown">
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
                <div className='flex flex-row items-center font-medium gap-7'>
                    <div className='hidden px-2 py-1 text-white border border-white rounded-md sm:block'>Docs</div>
                    {signed == 0 ?
                    (<NetworkSelect />) : (<></>)}

                    {/* EVM chains - RainbowKit */}
                    {network == "EVM Chains" ?
                      (<ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
                            const ready = mounted && authenticationStatus !== 'loading';
                            const connected =
                                ready &&
                                account &&
                                chain &&
                                (!authenticationStatus ||
                                    authenticationStatus === 'authenticated');

                            return (
                                <div
                                    {...(!ready && {
                                        'aria-hidden': true,
                                        'style': {
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                        },
                                    })}
                                >
                                    {(() => {
                                        if (!connected) {
                                            return (
                                                <button className="px-5 py-[8px] text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]" onClick={openConnectModal} type="button">
                                                    Connect Wallet
                                                </button>
                                            );
                                        }
                                        return (
                                            <div className='flex gap-6 px-2 text-white border rounded-md'>
                                                {/* <button className="px-5 py-[8px] text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]" onClick={openAccountModal} type="button">
                                                    Disconnect Wallet
                                                </button> */}
                                                
                                                <div className="flex gap-6">
                                                  <button
                                                      onClick={openChainModal}
                                                      className='flex items-center'
                                                      type="button"
                                                  >
                                                      {chain.hasIcon && (
                                                          <div
                                                              className='w-6 h-6 m-2 ml-0 rounded-full overflw-hidden'
                                                              style={{
                                                                  background: chain.iconBackground,
                                                              }}
                                                          >
                                                              {chain.iconUrl && (
                                                                  <img
                                                                      alt={chain.name ?? 'Chain icon'}
                                                                      src={chain.iconUrl}
                                                                      style={{ width: 24, height: 24 }}
                                                                  />
                                                              )}
                                                          </div>
                                                      )}
                                                      {chain.name}
                                                  </button>

                                                  <button onClick={openAccountModal} type="button">
                                                      {/* {account.displayName}
                                                      {account.displayBalance
                                                          ? ` (${account.displayBalance})`
                                                          : ''} */}
                                                      Disconnect
                                                  </button>
                                              </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                      </ConnectButton.Custom>) : (<></>)}

                    {/* Bitcoin Unisat wallet */}
                    {network == "Bitcoin" && signed == 0 ? 
                      (<button className="px-5 py-[8px] text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]" onClick={connectToUnisat} type="button">
                        Connect Wallet
                      </button>) : (<></>)}
                    {network == "Bitcoin" && signed == 1 ? 
                      (<div className='px-5 py-1 w-[200px] text-white border border-white rounded-md'>{address.slice(0, 15)}</div>) : (<></>)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
