import './App.css';
import Landing from './components/Landing';
import StorageManage from './components/StorageManage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useState, createContext, useContext } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [network, setNetwork] = useState("EVM Chains");
  const [signed, setSigned] = useState(0);
  const [address, setAddress] = useState("");
  const [authToken, setAuthToken] = useState("");

  return (
    <MyContext.Provider value={{ signed, setSigned, network, setNetwork, address, setAddress, authToken, setAuthToken}}>
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
