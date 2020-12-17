import React from "react";
import { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import { ContentBody, LogoImage, HeadButton, LandHeadline, LandSubline } from "./components";
import { useHistory } from "react-router-dom";
import useWeb3Modal from "./hooks/useWeb3Modal";

//@TODO: Disconnect Wallet에서 주소 나타나야 함.
function WalletButton({ provider, loadWeb3Modal }) {
    const [addr, setAddr] = useState('');
    let history = useHistory();

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
            console.log(addr);
            history.push("/create");
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
          <ContentBody>
              <LogoImage src={logo} alt="shallwecoffee-logo" />
              <LandHeadline>우리, 커피 한잔 할까요?</LandHeadline>
              <LandSubline>만나보고 싶은 사람이 있으신가요? <br/>Shall we coffee에서 토큰을 구입하고 약속을 잡아보세요.</LandSubline>
              <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal}>이더리움 지갑 연결하기</WalletButton>
          </ContentBody>
        </>
    );
}

export default Home;
