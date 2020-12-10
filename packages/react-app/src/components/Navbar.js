import React from "react";
  /* 
  TODO: 
  1. Float right 해결
  2. 로고 이미지/홈페이지 링크 삽입
  3. 폰트 import
  4. wallet connect for connectbtn



  타인의 페이지에서 내 프로필 접속시:
  지갑주소 -> 매니저 주소 -> IPFS 접근
  링크로 접속:
  URL split -> ENS -> IPFS 접근

  navbar -> 내 프로필 클릭시: Information 으로 넘길듯?
  지갑주소 -> 매니저 주소 -> IPFS 접근 -> 프로필 데이터 페치 (존재유무 따라서)
      존재시 -> ens 이름 가져오기
      존재안하면 -> Make a profile
  redirect to shallwecoffee.eth/username.eth
  */


  /*
  TODO (Metamask connection 위치에서 하기) : web3 connection + connection check
  Connection 은 있지만, 토큰이 없는경우 -> "내 프로필" 대신 "토큰 만들기" 버튼
  */

 var curUserWalletAddr;
 var curManagerAddr;

 function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
    return (
      <button class="generalbtn connectbutton"
        onClick={() => {
          if (!provider) {
            loadWeb3Modal();
          } else {
            logoutOfWeb3Modal();
          }
        }}
      >
        {!provider ? "Connect Wallet" : "Disconnect Wallet"}
      </button>
    );
}

function getProfileAddr() {
    
}

function Navbar() {
    return (
        <div className="navbar">
            <div class="navera">
            <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
            <button class="generalbtn editprof"
            onclick="getProfile()"
            ></button>
            </div>
        </div>
    );
}