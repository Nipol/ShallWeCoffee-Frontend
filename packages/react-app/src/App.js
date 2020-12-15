import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { Link, Route } from "react-router-dom";
import Home from "./Home";
import Sample from "./Sample";
// import { getDefaultProvider } from "@ethersproject/providers";
import { ethers, BigNumber, utils } from "ethers";

// eslint-disable-next-line
import { Body, Button, Header } from "./components";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { addresses, abis } from "@project/contracts";
// eslint-disable-next-line
function BalanceCheck({ provider }) {
  const fakeDai = new Contract(addresses.FAKE_DAI, abis.ERC20, provider);
  return (
    <Button
      onClick={async () => {
        const daiBalance = await fakeDai.balanceOf(
          "0xe9ef34F9ea6024019DE42C1B8ca6FE7507066762"
        );
        console.log({ tokenBalance: daiBalance.toString() });
      }}
    >
      Check Balance
    </Button>
  );
}

// const [tokenAddr, setTokenAddr] = useState("");
// const [mngAddr, setMngAddr] = useState("");

/*
1. Create token -> CreateToken (O)
2. Create/Edit profile -> CEP (O?)
3. Fetch data
Buyer:
1. Buy/Sell token
2. Make reservation
Seller:
1. getStatus
2. confirm
3. finalize
*/
//1. Token deploy
function CreateToken({ provider }) {
  const [managerFactory, setManagerFactory] = useState(undefined);
  const getManagerFactory = useCallback(async () => {
    setTimeout(async () => {
      if (typeof provider !== "undefined") {
        const signer = provider.getSigner();
        const managerFactory = new Contract(
          addresses.MANAGER_FACTORY,
          abis.MANAGER_FACTORY_ABI,
          signer
        );
        setManagerFactory(managerFactory);
      }
    }, 500);
  }, [provider]);
  useEffect(() => {
    if (!managerFactory) {
      getManagerFactory();
    }
  }, [managerFactory, getManagerFactory]);
  return (
    <Button
      onClick={async () => {
        if (typeof managerFactory !== "undefined") {
          // const result = await managerFactory.callStatic.newManager(
          //   "coffee",
          //   "CTT",
          //   BigNumber.from("100")
          //     .mul("10")
          //     .mul("18"),
          //   BigNumber.from("2")
          //     .mul("10")
          //     .mul("18"),
          //   BigNumber.from("1")
          //     .mul("10")
          //     .mul("18"),
          //   {
          //     value: 1,
          //     gasLimit: BigNumber.from("4866690"),
          //   }
          // );
          const rv = BigNumber.from("10000000000").toString();
          const real = await managerFactory.newManager(
            "coffee",
            "CTT",
            utils.parseEther("100.0"),
            utils.parseEther("2.0"),
            utils.parseEther("1.0"),
            {
              value: ethers.utils.parseEther("1.0"),
              gasLimit: BigNumber.from("4866690"),
            }
          );
          //tokAddr = result[0];
          //manager = result[1];
          //console.log({ result });
        }
      }}
    >
      {!provider ? "Provider not ready" : "Deploymanager"}
    </Button>
  );
}
// 2. Landing -> manager 접근
// function AccessMng({ provider }) {
//   const [mngFact, setMngFact] = useState("");
//   const [mng, setMng] = useState("");
//   const getMngFact = useCallback(async () => {
//     setTimeout(async () => {
//       if (typeof provider !== "undefined") {
//         const mngFact = new Contract(
//           addresses.MANAGER_FACTORY,
//           abis.MANAGER_FACTORY_ABI,
//           provider
//         );
//         setMngFact(mngFact);
//         const mngerAddr = await mngFact.getOwnerToManager(/*metamaskAddr*/);
//         if (mngerAddr !== "0x0000000000000000000000000000000000000000") {
//           //return ();
//         } else {
//           //return ();
//         }
//       }
//     }, 500);
//   }, [provider]);
// }
// 구매
function BuyToken({ provider }) {
  const [uniSwap, setUniSwap] = useState(undefined);
  const [mngFact, setMngFact] = useState(undefined);
  const [mng, setMng] = useState(undefined);
  const [curPrice, setCurPrice] = useState(undefined);
  const getUniSwap = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        const mngFact = new Contract(
          addresses.MANAGER_FACTORY,
          abis.MANAGER_FACTORY_ABI,
          signer
        );
        setMngFact(mngFact);
        // const mng = new Contract(urlSplit, abis.MANAGER_ABI, provider);
        // setMng(mng);
        const uniSwap = new Contract(
          "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
          abis.UNI_SWAP_ABI,
          signer
        );
        setUniSwap(uniSwap);

        //const tokenAddr = await mng.token();
        const mngAddr = await mngFact.ownerToManager(addr);
        const mng = new Contract(mngAddr, abis.MANAGER_ABI, signer);
        const tokenAddr = await mng.token();
        console.log(mngAddr);
        const WETH = await mngFact.WETH();
        const path = [WETH, tokenAddr];
        const curPrice = await uniSwap.getAmountsIn(
          ethers.utils.parseEther("1.0"),
          path,
          { gasLimit: BigNumber.from("900000") }
        );
        setCurPrice(curPrice);
        console.log(curPrice[0].toString());
        // const gas = await uniSwap.estimateGas.swapETHForExactTokens(
        //   BigNumber.from("1")
        //     .mul("10")
        //     .mul("18"),
        //   path,
        //   addr,
        //   ethers.constants.MaxUint256,
        //   {
        //     gasLimit: BigNumber.from("9000000"),
        //   }
        // );
        console.log("1");
        await uniSwap.swapETHForExactTokens(
          ethers.utils.parseEther("1.0"),
          path,
          addr,
          ethers.constants.MaxUint256,
          {
            value: curPrice[0],
            gasLimit: BigNumber.from("900000"),
          }
        );
        console.log("Token purchase request sent");
      }, 500);
    }
  }, [provider]);
  useEffect(() => {
    if (!uniSwap) {
      getUniSwap();
    }
  }, [uniSwap, getUniSwap]);
  return (
    <Button
      onClick={async () => {
        if (
          typeof uniSwap !== "undefined" &&
          typeof mng !== "undefined" &&
          typeof mngFact !== "undefined"
        ) {
          console.log("try");
          //console.log({ curPrice: curPrice });
        }
      }}
    >
      {!provider ? "Buy not ready" : "Buy ready"}
    </Button>
  );
}
// 판매
// function SellToken({ provider }) {
//   const [uniSwap, setUniSwap] = useState("");
//   const getUniSwap = useCallback(async () => {
//     setTimeout(async () => {
//       const signer = provider.getSigner();
//       const addr = await signer.getAddress();
//       const mngFact = new Contract(
//         addresses.MANAGER_FACTORY,
//         abis.MANAGER_FACTORY_ABI,
//         provider
//       );
//       setMngFact(mngFact);
//       const mng = new Contract(urlSplit, abis.MANAGER_ABI, provider);
//       const uniSwap = new Contract(
//         "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
//         abis.UNI_SWAP,
//         provider
//       );
//       setUniSwap(uniSwap);

//       const tokenAddr = await mng.token();
//       const WETH = await mngFact.WETH();
//       const path = [WETH, tokenAddr];
//       const curprice = await uniSwap.callStatic.getAmounts(
//         BigNumber.from("1")
//           .mul("10")
//           .mul("18"),
//         path
//       );
//       await uniSwap.swapExactTokensForETH(
//         BigNumber.from("1")
//           .mul("10")
//           .mul("18"),
//         path,
//         addr
//       );
//       console.log("Token sell request sent");
//     }, 500);
//   }, [provider]);
// }
//3. 약속잡기
//import { signERC2612Permit } from 'eth-permit';

// function MakeReserv({ provider }) {
//   const mngAddr = url.split("");
//   const value = web3.utils.toWei("1", "ether");
//   const result = async () => {
//     await signERC2612Permit(
//       window.ethereum,
//       tokenAddress,
//       구매자주소,
//       mngAddr,
//       value
//     );
//   };
//   const [mng, setMng] = useState("");
//   const getMng = useCallback(async () => {
//     setTimeout(async () => {
//       if (typeof provider !== "undefined") {
//         const mng = new Contract(mngAddr, abis.MANAGER_ABI, provider);
//         setMng(mng);
//         await mng.reservation(result.v, result.r, result.s);
//         console.log("Reservation request sent");
//       }
//     });
//   });
//   useEffect(() => {
//     if (!mng) {
//       getMng();
//     }
//   }, [mng, getMng]);
//   return (
//     <Button
//       onClick={async () => {
//         if (typeof mng !== "undefined") {
//           await mng.reservation(result.v, resylt.r, resylt.s);
//         }
//       }}
//     >
//       {!mng ? "not ready" : "ready"}
//     </Button>
//   );
// }

//4.상태확인
// function CheckStatus({ provider }) {
//   const booker = buyerAddr;
//   const getMng = useCallback(async () => {
//     setTimeout(async () => {
//       if (typeof provider !== "undefined") {
//         const mng = new Contract(mngAddr, abis.MANAGER_ABI, provider);
//         setMng(mng);
//         mng.getStatus(booker);
//       }
//     });
//   });
// }

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
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}
// eslint-disable-next-line
function Addr({ provider }) {
  const [addr, setAddr] = useState("");
  const getAddress = useCallback(async () => {
    setTimeout(async () => {
      if (typeof provider !== "undefined") {
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddr(addr);
      }
    }, 500);
  }, [provider]);

  useEffect(() => {
    if (!addr) {
      getAddress();
    }
  }, [addr, getAddress]);

  return <>{addr || ""}</>;
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <>
      <Header>
        <WalletButton
          provider={provider}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
      </Header>
      <Link to="/">Home</Link>
      <Link to="/sample"> Sample</Link>
      <Route path="/" component={Home} exact={true}></Route>
      <Route path="/sample" component={Sample}></Route>
      <CreateToken provider={provider}>DeployManager</CreateToken>
      <BuyToken provider={provider}>BuyToken</BuyToken>
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
