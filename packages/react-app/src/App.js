import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { Link, Route, Switch } from "react-router-dom";
import fulllogo from "./fulllogo.svg";
import Home from "./Home";
import Profile from "./Profile";
import Create from "./Create";
import Sample from "./Sample";
import Token from "./Token";
// import { getDefaultProvider } from "@ethersproject/providers";
// import { ethers } from "ethers";

import { Body, Button, Header } from "./components";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { addresses, abis } from "@project/contracts";

function BalanceCheck({ provider }) {
  const fakeDai = new Contract(addresses.FAKE_DAI, abis.ERC20, provider);
  return (
    <Button onClick={async () => {
      const daiBalance = await fakeDai.balanceOf("0xe9ef34F9ea6024019DE42C1B8ca6FE7507066762");
      console.log({ tokenBalance: daiBalance.toString() });
    }}>Check Balance</Button>
  );
}

//@TODO: Disconnect Wallet에서 주소 나타나야 함.
function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button style={{fontSize: '11px', lineHeight: '20px', padding: '4px 12px', borderRadius: '199px'}}
      onClick={async () => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet" }
    </Button>
  );
}

function Addr({provider}) {
  const [addr, setAddr] = useState('');

  const getAddress = useCallback(async () => {
    const timerId = setTimeout(async () => {
      if(typeof(provider) !== 'undefined') {
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddr(addr);
        clearTimeout(timerId);
      }
    }, 500);
  },[provider]);

  useEffect(() => {
    if (!addr) {
      getAddress();
    }
  }, [addr, getAddress]);
  
  return (
    <>
      {addr || ""}
    </>
  );
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <>
      <Header>
        <div className="left">
          <img src={fulllogo} alt="shallwecoffee-logo" />
        </div>
        <div className="right">
          <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
        </div>
      </Header>
      <Switch>
        <Route exact strict path="/" component={Home}></Route>
        <Route exact path="/create" component={Create}></Route>
        <Route path="/:manager" component={Profile}></Route>
        <Route exact strict path="/token" component={Token}></Route>
        <Route exact strict path="/sample" component={Sample}></Route>
      </Switch>
    </>
  );
}

export default App;
