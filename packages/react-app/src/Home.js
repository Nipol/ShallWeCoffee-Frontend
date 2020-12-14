import React from "react";
import { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import { Body, LogoImage, HeadButton, Headline, Subline } from "./components";
import { Redirect } from "react-router-dom";
import useWeb3Modal from "./hooks/useWeb3Modal";

//@TODO: Disconnect Wallet에서 주소 나타나야 함.
function WalletButton({ provider, loadWeb3Modal }) {
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
      <HeadButton
        onClick={async () => {
          if (!provider) {
            loadWeb3Modal();
          } else {
            console.log("월렛이 연결되어 있다면 Manager URL로 이동");
            console.log("그렇지만 Manager가 배포되어 있지 않다면 Manager만드는 화면으로 이동");
            // <Redirect to={{pathname: "/"}}></Redirect>
          }
        }}
      >
        이더리움 지갑 연결하기
      </HeadButton>
    );
  }

function Home() {
    const [provider, loadWeb3Modal] = useWeb3Modal();

    return (
        <>
        <Body>
            <LogoImage src={logo} alt="react-logo" />
            <Headline>우리, 커피 한잔 할까요?</Headline>
            <Subline>만나보고 싶은 사람이 있으신가요? <br/>Shall we coffee에서 토큰을 구입하고 약속을 잡아보세요.</Subline>
            <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal}>이더리움 지갑 연결하기</WalletButton>
        </Body>
        </>
    );
}

export default Home;
