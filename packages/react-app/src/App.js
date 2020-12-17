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
import { ethers, BigNumber, utils } from "ethers";

// eslint-disable-next-line
import { Body, Button, Header } from "./components";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { addresses, abis } from "@project/contracts";

import { signERC2612Permit } from "eth-permit";

function SellToken({ provider }) {
  const [uniSwap, setUniSwap] = useState(undefined);
  const [mngFact, setMngFact] = useState(undefined);
  const [mng, setMng] = useState(undefined);

  const [addr, setAddr] = useState(undefined);
  const [path, setPath] = useState([]);
  const [curPrice, setCurPrice] = useState(0);

  const getUniSwap = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const uniSwap = new Contract(
          "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
          abis.UNI_SWAP_ABI,
          signer
        );
        setUniSwap(uniSwap);
      }, 500);
    }
  }, [provider]);

  const getMngFact = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const mngFact = new Contract(
          addresses.MANAGER_FACTORY,
          abis.MANAGER_FACTORY_ABI,
          signer
        );
        setMngFact(mngFact);
      }, 500);
    }
  }, [provider]);

  const getMng = useCallback(async () => {
    if (
      typeof provider !== "undefined" &&
      typeof mngFact !== "undefined" &&
      typeof addr !== "undefined"
    ) {
      setTimeout(async () => {
        const mngAddr = await mngFact.ownerToManager(addr);
        const signer = provider.getSigner();
        const mng = new Contract(mngAddr, abis.MANAGER_ABI, signer);
        setMng(mng);
      }, 500);
    }
  }, [provider, mngFact, addr]);

  const getAddr = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddr(addr);
      }, 500);
    }
  }, [provider]);

  const getPath = useCallback(async () => {
    if (typeof mngFact !== "undefined" && typeof mng !== "undefined") {
      setTimeout(async () => {
        const tokenAddr = await mng.token();
        const WETH = await mngFact.WETH();
        const path = [tokenAddr, WETH];
        setPath(path);
      }, 500);
    }
  }, [mngFact, mng]);

  const getCurPrice = useCallback(async () => {
    if (typeof uniSwap !== "undefined" && path.length >= 2) {
      setTimeout(async () => {
        console.log({ path: path });
        const priceList = await uniSwap.getAmountsOut(
          ethers.utils.parseEther("1.0"),
          path,
          { gasLimit: BigNumber.from("900000") }
        );
        console.log({ priceList: priceList });
        setCurPrice(priceList[1]);
      }, 500);
    }
  }, [uniSwap, path]);

  useEffect(() => {
    if (!uniSwap) {
      getUniSwap();
    }
    if (!mngFact) {
      getMngFact();
    }
    if (!addr) {
      getAddr();
    }
    if (!mng) {
      getMng();
    }
    if (path.length == 0) {
      getPath();
    }
    if (curPrice == 0) {
      getCurPrice();
    }
  }, [
    uniSwap,
    getUniSwap,
    mngFact,
    getMngFact,
    mng,
    getMng,
    addr,
    getAddr,
    path,
    getPath,
    curPrice,
    getCurPrice,
  ]);
  return (
    <Button
      onClick={async () => {
        console.log({ uniSwap: uniSwap });
        console.log({ mngFact: mngFact });
        console.log({ mng: mng });
        console.log({ addr: addr });
        console.log({ path: path });
        console.log({ curPrice: curPrice });

        if (typeof uniSwap !== "undefined") {
          await uniSwap.swapExactTokensForETH(
            ethers.utils.parseEther("1.0"),
            curPrice,
            path,
            addr,
            ethers.constants.MaxUint256,
            {
              gasLimit: BigNumber.from("900000"),
            }
          );
          console.log("Token sell request sent");
        }
      }}
    >
      {!provider ? "Sell Not Ready" : "Sell ready"}
    </Button>
  );
}

function ApproveTrade({ provider }) {
  const [mngFact, setMngFact] = useState(undefined);
  const [mng, setMng] = useState(undefined);
  const [addr, setAddr] = useState(undefined);
  const [tokenAddr, setTokenAddr] = useState(undefined);
  const [tokenCont, setTokenCont] = useState(undefined);

  const getMngFact = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const mngFact = new Contract(
          addresses.MANAGER_FACTORY,
          abis.MANAGER_FACTORY_ABI,
          signer
        );
        setMngFact(mngFact);
      }, 500);
    }
  }, [provider]);

  const getMng = useCallback(async () => {
    if (
      typeof provider !== "undefined" &&
      typeof mngFact !== "undefined" &&
      typeof addr !== "undefined"
    ) {
      setTimeout(async () => {
        const mngAddr = await mngFact.ownerToManager(addr);
        const signer = provider.getSigner();
        const mng = new Contract(mngAddr, abis.MANAGER_ABI, signer);
        setMng(mng);
      }, 500);
    }
  }, [provider, mngFact, addr]);

  const getAddr = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddr(addr);
      }, 500);
    }
  }, [provider]);

  const getTokenAddr = useCallback(async () => {
    if (typeof mng !== "undefined") {
      setTimeout(async () => {
        const tokenAddr = await mng.token();
        setTokenAddr(tokenAddr);
      }, 500);
    }
  }, [mng]);

  const getTokenCont = useCallback(async () => {
    if (typeof tokenAddr !== "undefined" && typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = await provider.getSigner();
        const tokenCont = new Contract(tokenAddr, abis.ERC20, signer);
        setTokenCont(tokenCont);
      }, 500);
    }
  }, [provider, tokenAddr]);

  useEffect(() => {
    if (!mngFact) {
      getMngFact();
    }
    if (!addr) {
      getAddr();
    }
    if (!mng) {
      getMng();
    }
    if (!tokenAddr) {
      getTokenAddr();
    }
    if (!tokenCont) {
      getTokenCont();
    }
  }, [
    mngFact,
    getMngFact,
    addr,
    getAddr,
    mng,
    getMng,
    tokenAddr,
    getTokenAddr,
    tokenCont,
    getTokenCont,
  ]);

  return (
    <Button
      onClick={async () => {
        if (typeof tokenCont !== "undefined") {
          await tokenCont.approve(
            "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            utils.parseEther("1.0")
          );
          console.log("Token approved");
        }
      }}
    >
      {!provider ? "Approve Not Ready" : "Approve ready"}
    </Button>
  );
}

function ConFinReserv({ provider }) {
  const booker = "0x22797ee264d91C00D4E5f0C7B535841C56F296EA";

  const [mngFact, setMngFact] = useState(undefined);
  const [addr, setAddr] = useState(undefined);
  const [mng, setMng] = useState(undefined);

  const getMngFact = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const mngFact = new Contract(
          addresses.MANAGER_FACTORY,
          abis.MANAGER_FACTORY_ABI,
          signer
        );
        setMngFact(mngFact);
      }, 500);
    }
  }, [provider]);

  const getMng = useCallback(async () => {
    if (
      typeof provider !== "undefined" &&
      typeof mngFact !== "undefined" &&
      typeof addr !== "undefined"
    ) {
      setTimeout(async () => {
        const mngAddr = await mngFact.ownerToManager(addr);
        const signer = provider.getSigner();
        const mng = new Contract(mngAddr, abis.MANAGER_ABI, signer);
        setMng(mng);
      }, 500);
    }
  }, [provider, mngFact, addr]);

  const getAddr = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddr(addr);
      }, 500);
    }
  }, [provider]);

  useEffect(() => {
    if (!mngFact) {
      getMngFact();
    }
    if (!addr) {
      getAddr();
    }
    if (!mng) {
      getMng();
    }
  }, [mngFact, getMngFact, addr, getAddr, mng, getMng]);
  return (
    <>
      <div>{booker}</div>
      <Button
        onClick={async () => {
          if (
            typeof mngFact !== "undefined" &&
            typeof addr !== "undefined" &&
            typeof mng !== "undefined"
          ) {
            await mng.confirm(booker);
            await mng.finalize(booker, true);
            console.log("Reservation confirmed");
          }
        }}
      >
        {!provider ? "Confirm Not Ready" : "Confirm ready"}
      </Button>
    </>
  );
}

function CheckStatus({ provider }) {
  const booker = "0x22797ee264d91C00D4E5f0C7B535841C56F296EA";

  const [mngFact, setMngFact] = useState(undefined);
  const [addr, setAddr] = useState(undefined);
  const [mng, setMng] = useState(undefined);

  const getMngFact = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const mngFact = new Contract(
          addresses.MANAGER_FACTORY,
          abis.MANAGER_FACTORY_ABI,
          signer
        );
        setMngFact(mngFact);
      }, 500);
    }
  }, [provider]);

  const getMng = useCallback(async () => {
    if (
      typeof provider !== "undefined" &&
      typeof mngFact !== "undefined" &&
      typeof addr !== "undefined"
    ) {
      setTimeout(async () => {
        const mngAddr = await mngFact.ownerToManager(addr);
        const signer = provider.getSigner();
        const mng = new Contract(mngAddr, abis.MANAGER_ABI, signer);
        setMng(mng);
      }, 500);
    }
  }, [provider, mngFact, addr]);

  const getAddr = useCallback(async () => {
    if (typeof provider !== "undefined") {
      setTimeout(async () => {
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddr(addr);
      }, 500);
    }
  }, [provider]);

  useEffect(() => {
    if (!mngFact) {
      getMngFact();
    }
    if (!addr) {
      getAddr();
    }
    if (!mng) {
      getMng();
    }
  }, [mngFact, getMngFact, addr, getAddr, mng, getMng]);
  return (
    <>
      <div>{booker}</div>
      <Button
        onClick={async () => {
          if (
            typeof mngFact !== "undefined" &&
            typeof addr !== "undefined" &&
            typeof mng !== "undefined"
          ) {
            const result = await mng.getStatus(booker);
            console.log("Booker status");
            console.log({ result: result });
          }
        }}
      >
        {!provider ? "Status Not Ready" : "Status ready"}
      </Button>
    </>
  );
}

// function CancelReserv({ provider }) {
//   const booker = "0x22797ee264d91C00D4E5f0C7B535841C56F296EA";

//   const booker = "0x22797ee264d91C00D4E5f0C7B535841C56F296EA";

//   const [mngFact, setMngFact] = useState(undefined);
//   const [addr, setAddr] = useState(undefined);
//   const [mng, setMng] = useState(undefined);

//   const getMngFact = useCallback(async () => {
//     if (typeof provider !== "undefined") {
//       setTimeout(async () => {
//         const signer = provider.getSigner();
//         const mngFact = new Contract(
//           addresses.MANAGER_FACTORY,
//           abis.MANAGER_FACTORY_ABI,
//           signer
//         );
//         setMngFact(mngFact);
//       }, 500);
//     }
//   }, [provider]);

//   const getMng = useCallback(async () => {
//     if (
//       typeof provider !== "undefined" &&
//       typeof mngFact !== "undefined" &&
//       typeof addr !== "undefined"
//     ) {
//       setTimeout(async () => {
//         const mngAddr = await mngFact.ownerToManager(addr);
//         const signer = provider.getSigner();
//         const mng = new Contract(mngAddr, abis.MANAGER_ABI, signer);
//         setMng(mng);
//       }, 500);
//     }
//   }, [provider, mngFact, addr]);

//   const getAddr = useCallback(async () => {
//     if (typeof provider !== "undefined") {
//       setTimeout(async () => {
//         const signer = provider.getSigner();
//         const addr = await signer.getAddress();
//         setAddr(addr);
//       }, 500);
//     }
//   }, [provider]);

//   useEffect(() => {
//     if (!mngFact) {
//       getMngFact();
//     }
//     if (!addr) {
//       getAddr();
//     }
//     if (!mng) {
//       getMng();
//     }
//   }, [mngFact, getMngFact, addr, getAddr, mng, getMng]);
//   return (
//     <>
//       <div>{booker}</div>
//       <Button
//         onClick={async () => {
//           if (
//             typeof mngFact !== "undefined" &&
//             typeof addr !== "undefined" &&
//             typeof mng !== "undefined"
//           ) {
//             await mng.confirm(booker);
//             await mng.finalize(booker, true);
//             console.log("Reservation confirmed");
//           }
//         }}
//       >
//         {!provider ? "Confirm Not Ready" : "Confirm ready"}
//       </Button>
//     </>
//   );
// }

//@TODO: Disconnect Wallet에서 주소 나타나야 함.
function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button style={{fontSize: "11px", lineHeight: "20px", color: "#212736", background: "#F3F3F3", borderRadius: "199px"}}
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
        <Route exact strict path="/token" component={Token}></Route>
        <Route exact strict path="/sample" component={Sample}></Route>
        <Route path="/:manager" component={Profile}></Route>
      </Switch>
      {/* <CreateToken provider={provider}>DeployManager</CreateToken>
      <BuyToken provider={provider}>BuyToken</BuyToken>
      <SellToken provider={provider}>SellToken</SellToken>
      <ApproveTrade provider={provider}>Approve</ApproveTrade>
      <MakeReserv provider={provider}>Reservation</MakeReserv>
      <ConFinReserv provider={provider}>Confirm</ConFinReserv>
      <CheckStatus provider={provider}>Cancel</CheckStatus> */}
    </>
  );
}

export default App;
