import './App.css';
import Landing from './components/Landing';
import StorageManage from './components/StorageManage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useState, createContext, useContext } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [network, setNetwork] = useState("Bitcoin");
  const [signed, setSigned] = useState(0);
  const [address, setAddress] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [walletType, setWalletType] = useState("Unisat");
  const [refreshStorage, setRefreshStorage] = useState(0);
  
  return (
    <MyContext.Provider value={{ refreshStorage, setRefreshStorage, signed, setSigned, network, setNetwork, address, setAddress, authToken, setAuthToken, walletType, setWalletType}}>
      {children}
    </MyContext.Provider>
  );
};

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/storage' element={<StorageManage />}></Route>
        </Routes>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
