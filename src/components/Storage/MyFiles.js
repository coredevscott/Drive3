import '../../css/animations.css';
import { LuUpload } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { FiGithub } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";

import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';

import { useSignMessage } from 'wagmi'

import { useContext } from 'react'
import MyContext from '../../MyContext';

export default function Home() {
    // UseEffect flags
    var initFlag = 0;
    const [flag, setFlag] = useState(0);
    const [showModal, setShowModal] = useState(0);
    const [uploadFlag, setUploadFlag] = useState(0);

    // Rest Api response
    const [challenge, setChallenge] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [fileList, setFileList] = useState([]);
    const [tableContent, setTableContent] = useState([]);

    // Global variables
    const {signed, setSigned, network, setNetwork, address, setAddress} = useContext(MyContext);

    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
      message: challenge,
    });

    // Redirect if wallet not connected
    if(signed == 0) {
      window.location.href = '/';
    }

    // Get Challenge text
    useEffect(() => {
      if(signed == 1) {
        const headers = {
          'Origin': 'https://memo.io'
        };
        
        if(challenge == "" && initFlag == 0){
          initFlag = 1;

          axios.get('https://api.mefs.io:10000/test/challenge?address=' + address + '&' + 'chainid=1', { 
            headers
          })
          .then((response) => {
            setChallenge(response.data);
          })
          .catch((error) => {
              console.error(error);
          });
        }
      }
    }, []);

    // Wallet sign
    useEffect(() => {
      if(challenge != "" && flag == 0) { 
        signMessage();
        setFlag(1);
      }
    }, [challenge]);

    // Get signature
    useEffect(() => {
      if(isSuccess == true) {
        const headers = {
          "message": challenge,
          "signature": data,
          "recommender": null,
          "source": null
        };

        console.log('-----login request-----');
        console.log(challenge);
        console.log(data);

        axios.post('https://api.mefs.io:10000/test/login',
          headers
        )
        .then((response) => {
          console.log('-----login response-----');
          console.log(response);

          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        })
        .catch((error) => {
            console.error(error);
        });
      }
    }, [isSuccess]);

    // Get File list
    useEffect(() => {
      const request_headers = {
        'Authorization': 'Bearer ' + accessToken
      };

      axios.get('https://api.mefs.io:10000/test/mefs/listobjects',
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
    }, [accessToken, uploadFlag]);

    // Display File List
    useEffect(() => {
      var content = [];

      for(let i = 0; i < fileList.length; i ++) {
        content = [...content, (
          <div className='flex flex-row items-center w-full py-5'>
            <div className='w-1/4 text-white'>{fileList[i].Name}</div>
            <div className='w-1/4 text-white'>{fileList[i].ModTime}</div>
            <div className='w-1/4 text-white'>{fileList[i].Mid.slice(0, 14) + '...'}</div>
            <div className='w-1/4 text-white'>{(fileList[i].Size % 1000) + 'KB'}</div>
            <div className='flex flex-row items-center justify-center w-1/4 gap-5 text-white'>
              <div onClick={() => handleFileDelete(fileList[i].Mid)}><MdDelete className='w-6 h-6 text-white'/></div>
              <a href={'https://api.mefs.io:10000/test/mefs/' + fileList[i].Mid} target='_blank'><FaDownload className='w-5 h-5 text-white'/></a>
            </div>
          </div>
        )];
      }
      
      setTableContent(content);

    }, [fileList]);

    // File upload
    const handleFileUpload = () => {
      const fileInput = document.getElementById('file-input');
      const file = fileInput.files[0];
    
      console.log('-----file name to upload-----');
      console.log(file.name);

      const request_headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + accessToken
      };

      console.log('-----headers----');
      console.log('Bearer ' + accessToken);

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('https://api.mefs.io:10000/test/mefs/', formData, 
          {headers: request_headers}
        )
        .then((response) => {
          console.log('-----file upload response-----');
          console.log(response);

          setUploadFlag(1 - uploadFlag);
          alert("File Successfully Uploaded!\nMid: " + response.data.Mid);
        })
        .catch((error) => {
            console.error(error);
        });
      }
    };

    // File Delete
    const handleFileDelete = (fileMid) => {
      console.log('-----file delete request-----');
      console.log(fileMid);

      const request_headers = {
        'Authorization': 'Bearer ' + accessToken
      };

        axios.get('https://api.mefs.io:10000/test/mefs/delete?mid=' + fileMid,
          {headers: request_headers}
        )
        .then((response) => {
          console.log('-----file delete response-----');
          console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
      <div className="relative h-screen py-12 text-white bg-transparent fadeIn sm:py-20">
        
        {/* Modal */}
        {showModal == 1 ? (<div className='fixed fadeIn left-0 top-0 w-full h-full bg-transparent z-[1] backdrop-filter backdrop-blur-md'>
            <div className='relative flex flex-col items-center justify-center w-full h-full text-white'>
                <div className='relative w-full mx-8 sm:w-[540px] bg-[#292B34] p-10 rounded-xl'>
                    <XMarkIcon onClick={() => setShowModal(0)} className='absolute w-6 h-6 cursor-pointer top-3 right-3'/>
                    <div className='text-2xl font-bold text-left'>Upload</div>
                    <input type="file" id="file-input" className='mt-8'/>
                    {/* <div className='bg-[#444754] border border-dotted border-[#979797] rounded-xl h-[100px] mt-10 w-full text-[#898CA9] justify-center items-center flex'>Drag and drop files here</div> */}
                    <div className='flex flex-row justify-center gap-5 mt-10'>
                      <button className='px-7 py-2 font-medium text-white rounded-xl bg-transparent border border-white from-[#933FFE] w-[150px] to-[#18C8FF]' onClick={() => setShowModal(0)}>Close</button>
                      <button className='px-7 py-2 font-medium text-white rounded-xl bg-gradient-to-r from-[#933FFE] to-[#18C8FF] w-[150px]' onClick={handleFileUpload}>Upload</button>                
                    </div>
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
              <button className='px-7 py-2 font-medium text-white rounded-xl bg-transparent border border-white from-[#933FFE] to-[#18C8FF]'>Public Files</button>
            </div>
            <div className='flex flex-row gap-3 items-center text-[#B982FF] font-medium cursor-pointer' onClick={() => setShowModal(1)}>
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
            <FaXTwitter className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/>
            <PiTelegramLogo className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/>
            <FiGithub  className='w-6 h-6 cursor-pointer hover:translate-y-[-5px] transition-transform duration-700'/>
          </div>
        </div>
      </div>
    )
}
