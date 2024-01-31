import * as React from 'react'
import '../../css/animations.css';
import { LuUpload } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { FiGithub } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";

import { signMessage } from 'sats-connect'

import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';

import { useSignMessage } from 'wagmi'

import { useContext } from 'react'
import MyContext from '../../MyContext';

export default function Home() {
    // UseEffect flags
    var initFlag = 0; // Prevent useEffect call twice when get challenge text
    const [flag, setFlag] = useState(0);  //Prevent walletSign twice
    const [showModal, setShowModal] = useState(0);  // Upload modal flag
    const [showShareModal, setShowShareModal] = useState(0);  // Share modal flag
    const [uploadFlag, setUploadFlag] = useState(0);  // Refresh table when upload finished

    // Rest Api response
    const [uploadStatus, setUploadStatus] = useState("Please select file and press upload button to start file uploading");
    const [challenge, setChallenge] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [fileList, setFileList] = useState([]);
    const [tableContent, setTableContent] = useState([]);
    const [sharedAddress, setSharedAddress] = useState("");

    // Global variables
    const {authToken, setAuthToken, signed, setSigned, network, setNetwork, address, setAddress, walletType, setWalletType} = useContext(MyContext);

    const { data, isError, isLoading, isSuccess, signMessage: signMessageEVM } = useSignMessage({
      message: challenge,
    });

    const [btcSignMsg, setBtcSignMSg] = useState("");

    // Redirect if wallet not connected
    if(signed == 0) {
      window.location.href = '/';
    }

    // Step 1. Get Challenge text
    useEffect(() => {
      if(signed == 1) {
        const request_headers = {
          'Origin': 'https://memo.io'
        };
        
        if(challenge == "" && initFlag == 0){
          initFlag = 1;

          console.log('-----challenge request-----');
          console.log(address);

          if(network == "EVM Chains"){
            axios.get('https://api.mefs.io:10000/produce/challenge?address=' + address + '&' + 'chainid=1',
              {headers: request_headers}
            )
            .then((response) => {
              console.log('-----challenge response-----');
              console.log(response.data);
              
              setChallenge(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
          }
          else if(network == "Bitcoin") {
            axios.get('https://api.mefs.io:10000/produce/btc/challenge?address=' + address, 
              {headers: request_headers}
            )
            .then((response) => { 
              setChallenge(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
          }
        }
      }
    }, []);

    // Step 2. Wallet sign
    useEffect(() => {
      if(challenge != "" && flag == 0) { 
        if(network == "EVM Chains") {
          signMessageEVM();
        }
        else if(network == "Bitcoin") {
          async function signMessageAsync() {
            try {
              if(walletType == "Unisat") {
                let res = await window.unisat.signMessage(challenge);
                setBtcSignMSg(res);
              }
              else if(walletType == "Bitget") { 
                let res = await window.bitkeep.unisat.signMessage(challenge);
                setBtcSignMSg(res);
              }
              else if(walletType == "Phantom"){
                const message = new TextEncoder().encode(challenge);
                const {signature} = await window.phantom.bitcoin.signMessage(address, message);
                const base64Signature = btoa(String.fromCharCode.apply(null, signature));
                setBtcSignMSg(base64Signature);
              } 
              else if(walletType == "Xverse"){
                console.log('-----xverse sign-----');
                console.log(address);
                console.log(challenge);
                
                const signMessageOptions = {
                  payload: {
                    network: {
                      type: "Mainnet",
                    },
                    address: address,
                    message: challenge,
                  },
                  onFinish: (response) => {
                    setBtcSignMSg(response);
                  },
                  onCancel: () => console.log("Xverse Sign Message Canceled"),
                };
                await signMessage(signMessageOptions);  
              }
              else if(walletType == "Okx"){
                const result = await window.okxwallet.bitcoin.signMessage(challenge, 'ecdsa')
                setBtcSignMSg(result);
              } 
            } catch (e) {
              console.log(e);
            }
          }

          signMessageAsync();
        }
        setFlag(1);
      }
    }, [challenge]);

    // Step 3. Get signature
    useEffect(() => {
      if(isSuccess == true) { // EVM Chain Wallet Sign
        const headers = {
          "message": challenge,
          "signature": data,
          "recommender": null,
          "source": null
        };

        console.log('-----login request-----');
        console.log(challenge);
        console.log(data);  //signature

        axios.post('https://api.mefs.io:10000/produce/login',
          headers
        )
        .then((response) => {
          console.log('-----login response-----');
          console.log(response);

          setAuthToken(response.data.accessToken);  // Set Global Variable for Auth
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        })
        .catch((error) => {
            console.error(error);
        });
      }
      else if(btcSignMsg != "") { //Unisat & Bitget wallet Sign
        const headers = {
          "message": challenge,
          "signature": btcSignMsg,
          "recommender": null,
          "source": null
        };

        console.log('-----btc login request-----');
        console.log(challenge);
        console.log(btcSignMsg);

        axios.post('https://api.mefs.io:10000/produce/btc/login',
          headers
        )
        .then((response) => {
          console.log('-----btc login response-----');
          console.log(response);

          setAuthToken(response.data.accessToken);  // Set Global Variable for Auth
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        })
        .catch((error) => {
            console.error(error);
        });
      }
    }, [isSuccess, btcSignMsg]);

    // Step 4. Get File list
    useEffect(() => {
      const request_headers = {
        'Authorization': 'Bearer ' + accessToken
      };

      if(accessToken != "") {
        axios.get('https://api.mefs.io:10000/produce/mefs/listobjects',
          {headers: request_headers}
        )
        .then((response) => {
          console.log('-----get file list respoinse-----');
          console.log(response);

          setFileList(response.data.Objects);
        })
        .catch((error) => {
            console.error(error); 
        });
      }
    }, [accessToken, uploadFlag]);

    // Display File List
    useEffect(() => {
      var content = [];

      if(fileList != null && fileList.length != 0)
        fileList.sort((a, b) => a.Size - b.Size);

      if(fileList != null){
        for(let i = 0; i < fileList.length; i ++) {
          content = [...content, (
            <div className='flex flex-row items-center w-full py-5'>
              <div className='w-1/4 text-white'>{fileList[i].Name.length > 19 ? fileList[i].Name.slice(0, 19) + '...' : fileList[i].Name}</div>
              <div className='w-1/4 text-white'>{fileList[i].ModTime}</div>
              <div className='w-1/4 text-white'>{fileList[i].Mid.slice(0, 7) + '...' + fileList[i].Mid.slice(fileList[i].Mid.length - 7, fileList[i].Mid.length - 1)}</div>
              <div className='w-1/4 text-white'>{(fileList[i].Size / 1000) + 'KB'}</div>
              <div className='flex flex-row items-center justify-center w-1/4 gap-5 text-white'>
                <div onClick={() => handleDownload(fileList[i].Name, fileList[i].Mid)}><FaDownload className='w-5 h-5 text-white cursor-pointer'/></div>
                <div onClick={() => handleFileDelete(fileList[i].ID)}><MdDelete className='w-6 h-6 text-white cursor-pointer'/></div>
                <div><IoMdShare className='w-6 h-6 text-white cursor-pointer' onClick={() => handleFileShare({"mid": fileList[i].Mid, "name": fileList[i].Name})}/></div>
              </div>
            </div>
          )];
        }
      }
      
      setTableContent(content);
    }, [fileList]);

    // Step 5. File upload
    const handleFileUpload = () => {
      const fileInput = document.getElementById('file-input');
      const file = fileInput.files[0];
    
      const request_headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + accessToken
      };

      console.log('-----file name to upload-----');
      console.log(file.name);

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        setUploadStatus("Uploading " + file.name + " ...");

        axios.post('https://api.mefs.io:10000/produce/mefs/', formData, 
          {headers: request_headers}
        )
        .then((response) => {
          console.log('-----file upload response-----');
          console.log(response);

          setUploadStatus("File Successfully Uploaded - Mid: " + response.data.Mid.slice(0, 15) + '...');
          setUploadFlag(1 - uploadFlag);
        })
        .catch((error) => {
          console.error(error);

          setUploadStatus("File Upload Failed, please select again");
          setUploadFlag(1 - uploadFlag);
        });
      }
    };

    // Step 6. Download File
    const handleDownload = (fileName, fileMid) => {
      console.log('-----file download request-----');
      console.log(fileMid);

      const url = 'https://api.mefs.io:10000/produce/mefs/' + fileMid;
      const request_headers = {
        'Authorization': 'Bearer ' + accessToken
      };
  
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
        headers: request_headers
      })
        .then(response => {
          console.log('-----file download response-----');
          console.log(response);
          
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    // Step 7. File Delete
    const handleFileDelete = (fileId) => {
      console.log('-----file delete request-----');
      console.log(fileId);

      const request_headers = {
        'Authorization': 'Bearer ' + accessToken
      };

        axios.get('https://api.mefs.io:10000/produce/mefs/delete?id=' + fileId,
          {headers: request_headers}
        )
        .then((response) => {
          console.log('-----file delete response-----');
          console.log(response);

          setUploadFlag(1 - uploadFlag);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    // Step 7. File Share
    const handleFileShare = (fileData) => {
      console.log('-----file share request-----');
      console.log(fileData);

      const request_headers = {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      };

        axios.post('https://api.mefs.io:10000/produce/share',
          {"mid": fileData.mid, "name": fileData.name, "type": 0},
          {headers: request_headers}
        )
        .then((response) => {
          console.log('-----file share response-----');
          console.log(response);

          setSharedAddress(response.data); 
          setShowShareModal(1);
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    return (
      <div className="relative py-12 text-white bg-transparent fadeIn sm:py-16">
        
        {/* Modal */}
        {showModal == 1 ? (<div className='fixed fadeIn left-0 top-0 w-full h-full bg-transparent z-[1] backdrop-filter backdrop-blur-md'>
            <div className='relative flex flex-col items-center justify-center w-full h-full text-white'>
                <div className='relative w-full mx-8 sm:w-[540px] bg-[#292B34] p-10 rounded-xl flex items-center flex-col justify-center'>
                    <XMarkIcon onClick={() => setShowModal(0)} className='absolute w-6 h-6 cursor-pointer top-3 right-3'/>
                    <div className='text-2xl font-bold text-left'>Upload File</div>
                    <div className='flex items-center justify-center p-4 mt-12 border border-gray-500 border-dotted'>
                    {uploadStatus[0] == "U" ? (<input disabled type="file" id="file-input" className=''/>) : (<input type="file" id="file-input" className=''/>)}                   
                    </div>
                    <div className='flex flex-row items-center justify-center gap-5 mt-8'>
                      {
                        uploadStatus != "Uploading" ? (<div className='text-sm text-white sm:text-md'>
                          {uploadStatus}
                        </div>) : (<i className="fa fa-spinner fa-spin"></i>)
                      }
                    </div>
                    {/* <div className='bg-[#444754] border border-dotted border-[#979797] rounded-xl h-[100px] mt-10 w-full text-[#898CA9] justify-center items-center flex'>Drag and drop files here</div> */}
                    {uploadStatus[0] == "U" ?
                      (<div className='flex flex-row justify-center gap-5 mt-10'>
                        <button disabled className='px-7 py-2 font-medium text-white rounded-xl bg-transparent border border-white from-[#933FFE] w-[150px] to-[#18C8FF]' onClick={() => setShowModal(0)}>Close</button>
                        <button disabled className='px-7 py-2 font-medium text-white rounded-xl bg-gradient-to-r from-[#933FFE] to-[#18C8FF] w-[150px]' onClick={handleFileUpload}>Upload</button>
                      </div>) :
                      (<div className='flex flex-row justify-center gap-5 mt-10'>
                      <button className='px-7 py-2 font-medium text-white rounded-xl bg-transparent border border-white from-[#933FFE] w-[150px] to-[#18C8FF]' onClick={() => setShowModal(0)}>Close</button>
                      <button className='px-7 py-2 font-medium text-white rounded-xl bg-gradient-to-r from-[#933FFE] to-[#18C8FF] w-[150px]' onClick={handleFileUpload}>Upload</button>
                    </div>)
                  }
                </div>        
            </div>
        </div>) : null}

        {/* Modal */}
        {showShareModal == 1 ? (<div className='fixed fadeIn left-0 top-0 w-full h-full bg-transparent z-[1] backdrop-filter backdrop-blur-md'>
          <div className='relative flex flex-col items-center justify-center w-full h-full text-white'>
              <div className='relative w-full mx-8 sm:w-[540px] bg-[#292B34] p-10 rounded-xl flex items-center flex-col justify-center'>
                  <XMarkIcon onClick={() => setShowShareModal(0)} className='absolute w-6 h-6 cursor-pointer top-3 right-3'/>
                  <div className='text-2xl font-bold text-left'>File Share</div>
                  <div className='max-w-md overflow-auto font-medium text-left mt-7 text-md'>{sharedAddress}</div>
                  <button className='mt-7 px-7 py-2 font-medium text-white rounded-xl bg-transparent border border-white from-[#933FFE] w-[150px] to-[#18C8FF]' onClick={() => setShowShareModal(0)}>Close</button>
              </div>        
          </div>
        </div>) : null}

        <div className="flex flex-col items-start justify-start px-6 mx-auto max-w-7xl lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            My Files
          </h2>
          <div className='flex flex-row justify-between w-full mt-10'>
            <div className='flex flex-col gap-5 sm:flex-row'>
              <button className='px-7 py-2 font-medium text-white rounded-xl bg-gradient-to-r from-[#933FFE] to-[#18C8FF]'>Private Files</button>
              <button className='px-7 py-2 font-medium text-white rounded-xl bg-[#18C8FF] bg-opacity-20 hover:bg-opacity-30'>Public Files</button>
            </div>
            <div className='flex flex-row gap-3 items-center text-[#B982FF] font-medium cursor-pointer mr-5' onClick={() => setShowModal(1)}>
              <LuUpload className='w-5 h-5'/>
              Upload
            </div>
          </div>
          <div className='w-full overflow-auto'>
            <div className='mt-10 bg-[#292C51] flex flex-row rounded-xl py-5 w-[1200px]'>
              <div className='w-1/4 text-white'>File Name</div>
              <div className='w-1/4 text-white'>File Upload Time</div>
              <div className='w-1/4 text-white'>MID</div>
              <div className='w-1/4 text-white'>Size of File</div>
              <div className='w-1/4 text-white'>Operate</div>
            </div>
            <div className='bg-[#1A1B23] rounded-xl h-[450px] w-[1200px] overflow-x-hidden'>
              {tableContent}
            </div>
          </div>
          <div className='flex flex-row items-center justify-center w-full gap-5 mt-10 text-white'>
            <a href="https://twitter.com/ethdrive_net" target="_blank"><FaXTwitter className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/></a>
            <a href="https://t.me/ethdriveglobal" target="_blank"><PiTelegramLogo className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/></a>
            <a href="https://github.com/ethdriveio/ethdriveui.git" target="_blank"><FiGithub  className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/></a>
          </div>
        </div>
      </div>
    )
}

/*
https://api.mefs.io:10000/produce/
*/
