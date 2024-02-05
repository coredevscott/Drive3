import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa";

import { useContext } from 'react'
import MyContext from '../../MyContext';
import { useState } from 'react';

import { getAddress } from 'sats-connect'

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { XMarkIcon } from '@heroicons/react/24/outline';
import { signMessage } from 'sats-connect';

import '../../css/drive3.css';
import '../../css/animations.css';

import NetworkSelect from './NetworkSelect';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [showModal, setShowModal] = useState(0);
  
  const account = useAccount();
  const {signed, setSigned, network, setNetwork, address, setAddress, walletType, setWalletType} = useContext(MyContext);

  useEffect(() => {
    if(account.address) {
      setAddress(account.address);
      setSigned(1);
    }
    else
      setSigned(0);
  }, [account.address]);

  const connectToUnisat = async () => {
    if (typeof window.unisat !== 'undefined' && window.unisat !== null) {
      try {
        let accounts = await window.unisat.requestAccounts();
        console.log('Unisat Wallet Connect Success!');

        let res = await window.unisat.getAccounts();
        setAddress(res[0]);
        setSigned(1);
        setWalletType("Unisat");
        setShowModal(0);
      } catch (e) {
        console.log('connect failed');
      }
    }
    else{
      alert("Unisat Wallet does not installed!");
    }
  };

  const connectToBitget = async () => {
    if (typeof window.bitkeep !== 'undefined' && window.bitkeep !== null) {
      const unisat = window.bitkeep.unisat;

      try {
        let accounts = await unisat.requestAccounts();
        console.log('Bigget Wallet Connect Success!');

        let res = await unisat.getAccounts();
        setAddress(res[0]);
        setSigned(1);
        setWalletType("Bitget");
        setShowModal(0);
      } catch (e) {
        console.log('connect failed');
      }
    }
    else{
      alert("Bitget Wallet does not installed!");
    }
  };

  const connectToPhantom = async () => {
    const provider = window.phantom.bitcoin;

    if (typeof provider !== 'undefined' && provider !== null) {
      try {
        let accounts = await provider.requestAccounts();
        console.log('Phantom Wallet Connect Success!');
        console.log(accounts);

        setAddress(accounts[0].address);
        setSigned(1);
        setWalletType("Phantom");
        setShowModal(0);
      } catch (e) {
        console.log('connect failed');
      }
    }
    else{
      alert("Phantom Wallet does not installed!");
    }
  };

  const connectToXverse = async () => {
    const getAddressOptions = {
      payload: {
        purposes: ['ordinals', 'payment'],
        message: 'Address for receiving Ordinals and payments',
        network: {
          type:'Mainnet'
        },
      },
      onFinish: (response) => {
        setAddress(response.addresses[0].address);
        setSigned(1);
        setWalletType("Xverse");
        setShowModal(0);
      },
      onCancel: () => alert('Xverse Wallet Connect Failed'),
      }
    
    try{
      await getAddress(getAddressOptions);
    } catch(e) {
      alert('Xverse Wallet is not installed');
    }
  };

  const connectToOkx = async () => {
    if(window.okxwallet == undefined || window.okxwallet == null)
      alert('Okx wallet does not installed');
    else {
      try {
        const result = await window.okxwallet.bitcoin.connect();
        
        setAddress(result.address);
        setSigned(1);
        setWalletType("Okx");
        setShowModal(0);
      } catch (e) {
        console.log('connect failed');
      }
    }
  };

  return (
    <Disclosure as="nav" className="relative bg-transparent fadeInDown">
      {({ open }) => (
        <>
          <div className="relative px-2 py-4 mx-auto cursor-pointer max-w-7xl sm:px-6 lg:px-8">
            {showModal == 1 ? (<div className='fixed fadeIn left-0 top-0 w-full h-full z-[10000] bg-transparent backdrop-filter backdrop-blur-md'>
                <div className='relative flex flex-col items-center justify-center w-full h-full text-white'>
                    <div className='relative w-full mx-8 sm:w-[540px] bg-[#292B34] p-10 rounded-xl flex items-center flex-col justify-center'>
                        <XMarkIcon onClick={() => setShowModal(0)} className='absolute w-6 h-6 cursor-pointer top-3 right-3'/>
                        <div className='text-2xl font-bold text-left'>Select Wallet for Bitcoin</div>
                        <div className='flex flex-row items-center justify-center gap-5 p-3 mt-10 text-xl font-medium border border-gray-500 rounded-xl w-[350px]' onClick={() => connectToUnisat()}><img src="./img/unisat.png" className='w-12 h-12 rounded-xl'></img>Connect with Unisat</div>
                        <div className='flex flex-row items-center justify-center gap-5 p-3 mt-6 text-xl font-medium border border-gray-500 rounded-xl w-[350px]' onClick={() => connectToBitget()}><img src="./img/bitget.jpg" className='w-12 h-12 rounded-xl'></img>Connect with Bitget</div>
                        <div className='flex flex-row items-center justify-center gap-5 p-3 mt-6 text-xl font-medium border border-gray-500 rounded-xl w-[350px]' onClick={() => connectToOkx()}><img src="./img/okx.png" className='w-12 h-12 rounded-xl'></img>Connect with OkxWallet</div>
                        <div className='flex flex-row items-center justify-center gap-5 p-3 mt-6 text-xl font-medium border border-gray-500 rounded-xl w-[350px]' onClick={() => connectToXverse()}><img src="./img/xverse.png" className='w-12 h-12 rounded-xl'></img>Connect with Xverse</div>
                        <div className='flex flex-row items-center justify-center gap-5 p-3 mt-6 text-xl font-medium border border-gray-500 rounded-xl w-[350px]' onClick={() => connectToPhantom()}><img src="./img/phantom.png" className='w-12 h-12 rounded-xl'></img>Connect with Phantom</div>
                    </div>        
                </div>
            </div>) : null}
            <div className="relative flex items-center justify-between h-16">
              <div className="flex flex-col items-center justify-center flex-1 sm:flex-row sm:items-stretch sm:justify-between">
                <div className="flex flex-row items-center flex-shrink-0 gap-4 mt-20 sm:mt-0">
                  {/* <a href="/"> */}
                    <img
                      className="w-auto cursor-pointer h-7"
                      src="./img/drive3.png"
                      alt="My logo"
                    />
                    <div className= 'text-2xl font-semibold text-white'>Drive 3</div>
                  {/* </a> */}
                  <a href="https://ethdrive.net/docs/#/EthDrive" target='_blank'><div className='px-2 py-1 ml-4 text-white border-white rounded-md'>Docs</div></a>
                </div>
                <div className='flex flex-row items-center mt-10 font-medium sm:mt-0 gap-7'>
                    <NetworkSelect />
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
                                            <div className={chain.hasIcon ? 'flex gap-6 px-2 text-white border rounded-md' : 'flex gap-6 px-2 py-[7px] text-white border rounded-md'}>
                                                {/* <button className="px-5 py-[8px] text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]" onClick={openAccountModal} type="button">
                                                    Disconnect Wallet
                                                </button> */}
                                                {!chain.iconUrl ? (<div>{chain.name} does not support</div>) :
                                                  (<div className="flex gap-6">
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

                                                  {/* <button onClick={openAccountModal} type="button">
                                                      {account.displayName}
                                                      {account.displayBalance
                                                          ? ` (${account.displayBalance})`
                                                          : ''} 
                                                      Disconnect
                                                  </button> */}
                                                  </div>)
                                                }
                                            </div>
                                            // <div className='px-5 py-[6px] w-[200px] text-white border border-white rounded-md'>{address.slice(0, 5) + ' ... ' + address.slice(address.length - 6, address.length)}</div>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                      </ConnectButton.Custom>) : (<></>)}

                    {/* Bitcoin Unisat wallet */}
                    {network == "Bitcoin" && signed == 0 || (network == "Bitcoin" && address.includes("0x")) ? 
                      (<button className="px-5 py-[8px] text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]" onClick={() => setShowModal(1)} type="button">
                        Connect Wallet
                      </button>) : (<></>)}
                    {network == "Bitcoin" && signed == 1 && !(network == "Bitcoin" && address.includes("0x"))? 
                      (<div className='px-5 py-[6px] w-[200px] text-white border border-white rounded-md'>{address.slice(0, 5) + ' ... ' + address.slice(address.length - 6, address.length)}</div>) : (<></>)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
