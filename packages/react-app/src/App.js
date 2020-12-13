import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { Link, Route } from "react-router-dom";
import Home from "./Home";
import Sample from "./Sample";
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
    <Button
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
    setTimeout(async () => {
      if(typeof(provider) !== 'undefined') {
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddr(addr);
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
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Link to="/">Home</Link>
      <Link to="/sample">    Sample</Link>
      <Route path="/" component={Home} exact={true}></Route>
      <Route path="/sample" component={Sample}></Route>

      {/* 
        / <- root path
        /0x[manager hash] <- 매니저 path
          wallet 연결된 사람이, manager에서 조회 했을 때 Owner다.
            요청된 약속, 및 진행중인 약속 탭이 보인다.
          wallet 연결된 사람이, mamger에서 조회 했을 때 오너가 아니라면,
            요청한 약속

          0x[manager hash]/profile -> 프로필 보여주는 거
          0x[manager hash]/requested -> 요청한 약속 보여주는 거
       */}

      {/* <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <Addr provider={provider} />
        <BalanceCheck provider={provider}></BalanceCheck>
      </Body> */}
    </>
  );
}

export default App;
