import React, { useState, useEffect } from "react";
import './App.css';

import Routers from './Router';
import { useWallet, UseWalletProvider } from 'use-wallet'
import ReactLoading from "react-loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoadingScreen() {
  return (
    <div className="loadingScreen">
      <div className="loading">
        <ReactLoading type="bubbles" color={"#926e2b"} />
      </div>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])
  return (
    <>
      {loading === true ? <LoadingScreen /> :
        <UseWalletProvider
          chainId={4002}
          connectors={{
            // This is how connectors get configured
            portis: { dAppId: 'my-dapp-id-123-xyz' },
          }}
        >
          <Routers />
          <ToastContainer />
        </UseWalletProvider>
      }
    </>
  );
}

export default App;
