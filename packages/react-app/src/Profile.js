import React from "react";
import { useCallback, useEffect, useState } from "react";
import pin from "./pin.svg";
import work from "./work.svg";
import pic from "./photo1-2.jpg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    useParams,
    useRouteMatch,
    useLocation
  } from "react-router-dom";
import { Body, Jumbotron, ProfilePic, MiniNav, ProfileBody, InputContainer, GreyBack, TokenStates, RowContainer, LinkButton, ColumnContainer } from "./components";
import ReactMarkdown from 'react-markdown';
import useWeb3Modal from "./hooks/useWeb3Modal";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { addresses, abis } from "@project/contracts";
import { ethers, BigNumber, utils, Contract } from "ethers";
import Proptypes from "prop-types";
import { signERC2612Permit } from "eth-permit";

const Field = ({placeholder, unit, onUpdate, value}) => {
    return (
        <>
        <InputContainer>
            <input placeholder={placeholder} value={value} onChange={(e) => {onUpdate(e.target.value);}}/>
            {unit !== "" ? <div>{unit}</div> : null }
        </InputContainer>
        </>
    );
}

Field.propTypes = {
    value: Proptypes.string,
    placeholder: Proptypes.string,
    unit: Proptypes.string
}

const Confirm = ({ provider }) => {
    const booker = "0x2e6bE9855A3bF02C73Ba74B7d756a63DB7762238";
  
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
        <LinkButton style={{borderRadius: "199px"}}
          onClick={async () => {
            if (
              typeof mngFact !== "undefined" &&
              typeof addr !== "undefined" &&
              typeof mng !== "undefined"
            ) {
              await mng.confirm(booker);
              console.log("Reservation confirmed");
            }
          }}
        >
          {!provider ? "Confirm Not Ready" : "수락"}
        </LinkButton>
      </>
    );
  }

  const Finalize = ({ provider }) => {
    const booker = "0x2e6bE9855A3bF02C73Ba74B7d756a63DB7762238";
  
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
        <LinkButton style={{borderRadius: "199px"}}
          onClick={async () => {
            if (
              typeof mngFact !== "undefined" &&
              typeof addr !== "undefined" &&
              typeof mng !== "undefined"
            ) {
              await mng.finalize(booker, {gasLimit: BigNumber.from('500000')});
              console.log("Reservation confirmed");
            }
          }}
        >
          {!provider ? "Confirm Not Ready" : "약속 종료"}
        </LinkButton>
      </>
    );
  }

const Reservation = ({provider, location}) => {
    const [mngFact, setMngFact] = useState(undefined);
    const [tokenAddr, setTokenAddr] = useState(undefined);
    const [addr, setAddr] = useState(undefined);
    const [mng, setMng] = useState(undefined);
    const [mngAddr, setMngAddr] = useState(undefined);
    const [reqToken, setReqToken] = useState(undefined);

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
    
      const getTokenAddr = useCallback(async () => {
        if (typeof mng !== "undefined") {
          setTimeout(async () => {
            const tokenAddr = await mng.token();
            setTokenAddr(tokenAddr);
          }, 500);
        }
      }, [mng]);
    
      const getAddr = useCallback(async () => {
        if (typeof provider !== "undefined") {
          setTimeout(async () => {
            const signer = provider.getSigner();
            const addr = await signer.getAddress();
            setAddr(addr);
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
            const managerAddr = (location.pathname.split('/'))[1];
            const signer = provider.getSigner();
            const mng = new Contract(managerAddr, abis.MANAGER_ABI, signer);
            setMng(mng);
          }, 500);
        }
      }, [provider, mngFact, addr, location.pathname]);
    
      const getMngAddr = useCallback(async () => {
        if (typeof addr !== "undefined" && typeof mngFact !== "undefined") {
          setTimeout(async () => {
            const managerAddr = (location.pathname.split('/'))[1];
            setMngAddr(managerAddr);
          }, 500);
        }
      }, [addr, location.pathname, mngFact]);

      const getReqToken = useCallback(() => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const managerAddr = (location.pathname.split('/'))[1];
                const mng = new Contract(managerAddr, abis.MANAGER_ABI, signer);
                const req = await mng.requireAmount();
                setReqToken(utils.formatEther(req.toString()).toString());
            }, 500);
        }
    }, [location.pathname, provider]);
    
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
        if (!mngAddr) {
          getMngAddr();
        }
        if(!reqToken) {
            getReqToken();
        }
      }, [mngFact, getMngFact, addr, getAddr, mng, getMng, tokenAddr, getTokenAddr, mngAddr, getMngAddr, reqToken, getReqToken]);
      return (
        <LinkButton
          onClick={async () => {
            if (
              typeof tokenAddr !== "undefined" &&
              typeof addr !== "undefined" &&
              typeof mngAddr !== "undefined" &&
              typeof mng !== "undefined"
            ) {
              const value = utils.parseEther(reqToken).toString();
              const result = await signERC2612Permit(
                window.ethereum,
                tokenAddr,
                addr,
                mngAddr,
                value
              );
              await mng.reservation(result.v, result.r, result.s, {
                gasLimit: BigNumber.from("5000000"),
              });
              console.log({ result: result });
            }
          }}
        >
          {!provider ? "Resev Not Ready" : "토큰을 사용하여 약속하기"}
        </LinkButton>
      );
}

const BuyToken = ({provider, buyToken, location}) => {
    const [uniSwap, setUniSwap] = useState(undefined);
    const [curPrice, setCurPrice] = useState(undefined);
    const [path, setPath] = useState([]);
    const [addr, setAddr] = useState(undefined);

    const getAddr = useCallback(async () => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const addr = await signer.getAddress();
                setAddr(addr);
            }, 500);
        }
    }, [provider]);

    const getUniSwap = useCallback(async () => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const mngFact = new Contract(
                    addresses.MANAGER_FACTORY,
                    abis.MANAGER_FACTORY_ABI,
                    signer
                );
                const uniSwap = new Contract(
                    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
                    abis.UNI_SWAP_ABI,
                    signer
                    );
                setUniSwap(uniSwap);
                const managerAddr = (location.pathname.split('/'))[1];
                const mng = new Contract(managerAddr, abis.MANAGER_ABI, signer);
                const tokenAddr = await mng.token();
                const WETH = await mngFact.WETH();
                const path = [WETH, tokenAddr];
                setPath(path);
                const priceList = await uniSwap.getAmountsIn(
                    ethers.utils.parseEther(buyToken),
                    path,
                    { gasLimit: BigNumber.from("900000") }
                );
                setCurPrice(priceList[0]);
            }, 500);
        }
    }, [buyToken, location.pathname, provider]);

    useEffect(() => {
        if(!addr) {
            getAddr();
        }
        if (!uniSwap && addr) {
            getUniSwap();
        }
    }, [uniSwap, getUniSwap, addr, getAddr]);

    return (
      <LinkButton
        onClick={async () => {
          if (typeof uniSwap !== "undefined") {
            await uniSwap.swapETHForExactTokens(
              ethers.utils.parseEther(buyToken),
              path,
              addr,
              ethers.constants.MaxUint256,
              {
                value: curPrice,
                gasLimit: BigNumber.from("900000"),
              }
            );
          }
        }}
      >
        {!provider ? "Buy not ready" : "구매하기"}
      </LinkButton>
    );
}

const Profile = () => {
    let location = useLocation();
    let { path, url } = useRouteMatch();
    const [provider] = useWeb3Modal();
    const [buyTokenPrice, setBuyTokenPrice] = useState(undefined);
    const [tokenCount, setTokenCount] = useState(undefined);
    const [ethBalance, setEthBalance] = useState(undefined);
    const [tokenBalance, setTokenBalance] = useState(undefined);
    const [buyToken, setBuyToken] = useState("1");
    const [reqEth, setReqEth] = useState(undefined);
    const [reqToken, setReqToken] = useState(undefined);
    const [isAdmin, setIsAdmin] = useState(undefined);

    const getBuyTokenPrice = useCallback(() => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const mngFact = new Contract(
                    addresses.MANAGER_FACTORY,
                    abis.MANAGER_FACTORY_ABI,
                    signer
                );
                const uniSwap = new Contract(
                    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
                    abis.UNI_SWAP_ABI,
                    signer
                );
                const managerAddr = (location.pathname.split('/'))[1];
                const mng = new Contract(managerAddr, abis.MANAGER_ABI, signer);
                const tokenAddr = await mng.token();
                const WETH = await mngFact.WETH();
                const path = [WETH, tokenAddr];
                const priceList = await uniSwap.getAmountsIn(
                    ethers.utils.parseEther(buyToken),
                    path,
                    { gasLimit: BigNumber.from("900000") }
                );
                setBuyTokenPrice(utils.formatEther(priceList[0].toString()).toString());
            }, 500);
        }
    }, [buyToken, location.pathname, provider]);

    const getTokenCount = useCallback(() => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const managerAddr = (location.pathname.split('/'))[1];
                const mng = new Contract(managerAddr, abis.MANAGER_ABI, signer);
                const tokenAddr = await mng.token();
                const token = new Contract(tokenAddr, abis.ERC20, signer);
                const uniswapRouter = new Contract("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", abis.UNI_SWAP_ABI, signer);
                const WETH = await uniswapRouter.WETH();
                const uniswapFactory = new Contract("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", abis.UNISWAP_FACTORY_ABI, signer);
                const lp = await uniswapFactory.getPair(tokenAddr, WETH);
                const balance = await token.balanceOf(lp);
                setTokenCount(utils.formatEther(balance.toString()).toString());
            }, 500);
        }
    }, [location.pathname, provider]);

    const getAdmin = useCallback(() => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const addr = await signer.getAddress();
                const managerAddr = (location.pathname.split('/'))[1];
                const mng = new Contract(managerAddr, abis.MANAGER_ABI, signer);
                const ownerAddr = await mng.owner();
                addr === ownerAddr ? setIsAdmin(true) : setIsAdmin(false);
            }, 500);
        }
    }, [location.pathname, provider]);

    const getEthBalance = useCallback(() => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const balance = await signer.getBalance();
                setEthBalance(utils.formatEther(balance.toString()).toString());
            }, 500);
        }
    }, [provider]);

    const getTokenBalance = useCallback(() => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const addr = await signer.getAddress();
                const managerAddr = (location.pathname.split('/'))[1];
                const mng = new Contract(managerAddr, abis.MANAGER_ABI, signer);
                const tokenAddr = await mng.token();
                const token = new Contract(tokenAddr, abis.ERC20, signer);
                const balance = await token.balanceOf(addr);
                setTokenBalance(utils.formatEther(balance.toString()).toString());
            }, 500);
        }
    }, [location.pathname, provider]);

    const getReqToken = useCallback(() => {
        if (typeof provider !== "undefined") {
            setTimeout(async () => {
                const signer = provider.getSigner();
                const managerAddr = (location.pathname.split('/'))[1];
                const mng = new Contract(managerAddr, abis.MANAGER_ABI, signer);
                const req = await mng.requireAmount();
                setReqToken(utils.formatEther(req.toString()).toString());
            }, 500);
        }
    }, [location.pathname, provider]);

    useEffect(() => {
        if (!buyTokenPrice) {
            getBuyTokenPrice();
        }
        if (!tokenCount) {
            getTokenCount();
        }
        if (!ethBalance) {
            getEthBalance();
        }
        //@TODO: 토큰 수량 바뀔 때 필요한 ETH를 유니스왑에서 가져와야 함.
        if (buyToken.length >= 1 && buyTokenPrice) {
            const price = utils.parseEther(buyTokenPrice);
            const p = BigNumber.from(buyToken).mul(price).toString();
            setReqEth(utils.formatEther(p).toString());
        }
        if (typeof isAdmin === 'undefined') {
            getAdmin();
        }
        if(!tokenBalance) {
            getTokenBalance();
        }
        if(!reqToken) {
            getReqToken();
        }
    }, [buyToken, ethBalance, getEthBalance, getTokenCount, getBuyTokenPrice, tokenCount, buyTokenPrice, isAdmin, getAdmin, tokenBalance, getTokenBalance, reqToken, getReqToken]);

    const activeStyle = {
        opacity: '1'
    }

    return (
        <>
            <Body>
                <Jumbotron>
                    <div className="container">
                        <div className="pic">
                            <ProfilePic>
                                <img src={pic} alt="profile"/>
                            </ProfilePic>
                        </div>
                        <div className="info">
                            <h1>최윤성</h1>
                            <legend><img src={work} alt="work icon"/>DSRV Labs</legend>
                            <legend><img src={pin} alt="coordinate"/>서울</legend>
                            {/* <legend><img src={link}/>https://www.facebook.com/me/</legend> */}
                        </div>
                    </div>
                </Jumbotron>
                <RowContainer>
                    {isAdmin === true ? (
                        <MiniNav>
                            <NavLink activeStyle={activeStyle} to={`${url}`}>프로필</NavLink>
                            <NavLink activeStyle={activeStyle} to={`${url}/progressing`}>진행중인 약속</NavLink>
                            <NavLink activeStyle={activeStyle} to={`${url}/request`}>요청된 약속</NavLink>
                        </MiniNav>
                    ) : (
                        <MiniNav>
                            <NavLink activeStyle={activeStyle} to={`${url}`}>프로필</NavLink>
                            <NavLink activeStyle={activeStyle} to={`${url}/requested`}>요청한 약속</NavLink>
                        </MiniNav>
                    )}
                    
                </RowContainer>

                <ColumnContainer>
                    <TokenStates style={{marginTop: '-220px'}}>
                        <div className="detail">
                            <div className="pic">
                                <ProfilePic/>
                            </div>
                            <div className="info">
                                <h4>WITH Coffee Sample</h4>
                                <div className="legend">0x88bf...2864</div>
                            </div>
                        </div>
                        <div className="receipt">
                            <div className="expenses">
                                <div className="label">현재 가격</div>
                                <div className="detail">{buyTokenPrice} ETH</div>
                            </div>
                            <div className="expenses">
                                <div className="label">남은 개수</div>
                                <div className="detail">{tokenCount} 개</div>
                            </div>
                        </div>
                        
                    </TokenStates>

                    <TokenStates style={{marginTop: '90px'}}>
                        {isAdmin === true ? (
                            <div>
                                지금 현재 주소를 공유하세요!
                            </div>
                        ): (
                            <Tabs>
                                <TabList>
                                    <Tab>구매</Tab>
                                    <Tab>판매</Tab>
                                    <Tab>약속하기</Tab>
                                </TabList>

                                <TabPanel>
                                    <Field placeholder="구매할 토큰 수량" unit="WITH" value={buyToken} onUpdate={setBuyToken}></Field>
                                    <GreyBack>
                                        <div className="receipt">
                                            <div className="expenses">
                                                <div className="label">보유 이더리움</div>
                                                <div className="detail">{ethBalance} ETH</div>
                                            </div>
                                            <div className="expenses">
                                                <div className="label">구매 금액</div>
                                                <div className="detail">{reqEth} ETH</div>
                                            </div>
                                        </div>
                                    </GreyBack>
                                    <BuyToken provider={provider} buyToken={buyToken} location={location}>구매하기</BuyToken>
                                </TabPanel>
                                <TabPanel>
                                    <Field placeholder="판매할 토큰 수량" unit="WITH"></Field>
                                    <GreyBack>
                                        <div className="receipt">
                                            <div className="expenses">
                                                <div className="label">판매 금액</div>
                                                <div className="detail">ETH</div>
                                            </div>
                                        </div>
                                    </GreyBack>
                                    <LinkButton>판매하기</LinkButton>
                                </TabPanel>
                                <TabPanel>
                                    <GreyBack>
                                        <div className="receipt">
                                            <div className="expenses">
                                                <div className="label">보유 토큰 수량</div>
                                                <div className="detail">{tokenBalance} WITH</div>
                                            </div>
                                            <div className="expenses">
                                                <div className="label">필요 토큰 수량</div>
                                                <div className="detail">{reqToken} WITH</div>
                                            </div>
                                        </div>
                                    </GreyBack>
                                    <Reservation provider={provider} location={location}>약속하기</Reservation>
                                </TabPanel>
                            </Tabs>
                        )}
                        
                    </TokenStates>
                </ColumnContainer>

                <Switch>
                    <Route exact path={path}>
                        <Desc />
                    </Route>
                    <Route exact path={`${path}/progressing`} component={Progressing}></Route>
                    <Route exact path={`${path}/Request`} component={Request}></Route>
                    <Route exact path={`${path}/requested`} component={Requested}></Route>
                </Switch>
            </Body>
        </>
    );
}

function Desc() {
    const markdown = `# 🪐 저와 맛있는 커피를 마실 수 있는 With ☕️ 토큰을 소개합니다.
이더리움 커뮤니티 등지에서는 소셜 토큰을 발행하는 사람들이 생겼습니다. 그중에서는 디자인 작업물을 판매하는 토큰도 있고, 팔로워가 많은 사용자는 모두가 볼 수 있게 Retweet을 해주는 토큰도 있습니다. 법률 서비스를 제공하는 토큰도 있는데, 공통적으로 개인이 가지고 있는 영향력과 입지를 판매한다는 점입니다.
제가 지난 새월 동안 찾은 것이라곤, 많은 영화를 본 것과 적은 책을 읽으며 커피를 마시는 취미가 있다는 것. 그리고 대화하는 것에 재미를 느낀다는 점입니다. 이러한 재미를 유지하기 위해 잘 설계된 프로그램인지 모르겠지만, 이를 통해 많은 분들을 만나 보았으면 합니다. **감사합니다.** 😁
# 💁 토큰은 이런 분들에게 필요합니다
- 🧑‍🎨 **커피를 알고 싶으신 분** — 서울 시내에서 맛있는 커피를 찾아다닌 지난 5년. 800원짜리 아메리카노 부터 시작하여, 17,000원 상당의 싱글 오리진까지 드디어 맛을 구별할 수 있게 되었습니다. 혹시 아침을 시작하며 마실 커피를 찾으시나요? 낮잠을 깨는데 필요한 커피를 찾으시나요? 제가 취향에 딱 맞는 커피를 찾는 여정을 제공할 수 있을 것입니다.
- 🔖 **영화 및 책 이야기를 하고 싶으신 분** — 올해 겨울이 정말 추웠죠. 따뜻했던 날들이 너무 많아서 가끔 있던 추운 날이 아주 사무쳤던 것으로 기억합니다. 그러다가 여름이 너무 그리워서 "⛲️ Call Me By Your Name"을 다시 한번 봤습니다. 저 내리쬐는 햇볕을 다시 만날 수 있다면 얼마나 좋을까요? 여름을 그리워하며 찾은 서점에서는 심너울 작가님의 "땡스 갓, 잇츠 프라이데이"라는 책을 골랐습니다. 10장 정도만 봤는데 너무 재미있지 뭐예요?
- 🧜 **자신을 알리고 싶으신 분** — 개인을 공개적으로 홍보해야 할 필요가 있으신가요? 우리는 모두 홍보가 필요합니다. 이런 홍보는 뭐라고 할까요... 새롭게 생긴 식당들은 필수적으로 인스타그램 계정을 만들고, 운영 시간과 메뉴들의 사진을 올립니다. 그러면 알고리즘에 의해 자동으로 노출됩니다. 광고비를 쓴다면 더 효율적으로 다가가겠죠. 이것과 마찬가지로 ‘나는 어떤 사람인가?’를 알리는 도구로는 자신이 인터뷰이(Interviewee)가 되는 것이 효과적입니다. 저는 이 프로그램의 일환으로 인터뷰를 편집하여 해당 페이지에서 공개할 것입니다.
- 🗺 **공간을 홍보하고 싶으신 분** — 커피가 맛있는 카페를 소유하고 계시나요? 또는 남들이 많이 찾아오길 바라는 공간을 소유하고 계시나요? 커피 토큰을 지불하고 커피챗을 위한 장소를 제공하세요. 카페를 운영하고 계시다면 저는 커핑클래스를 신청하거나, 두 잔 분량의 커피값을 지불할 것이고. 공간을 제공하신다면 공간에 대한 투어를 통해 자연스러운 홍보를 하실 수 있습니다.
- 🎆 "**With ☕️" 토큰을 발행하고 싶으신 분** — 이 프로그램을 흥미 있게 느끼셨나요? 이 글을 보시는 분도 토큰을 발행하실 수 있습니다! 토큰을 구매하시는데 어려움을 겪으신다면, 저에게 먼저 연락 주세요! 이후에 토큰을 발행하고 등록하는 과정을 모두 도와드리겠습니다.
- 🧸 **블록체인 사용자 경험을 개선 하고자 하시는 분** — 백엔드 개발자였다가, 프론트엔드 개발자를 넘어 최근 개인의 이력이 명확하게 Blockchain에 집중되어 있었습니다. 우여곡절이 많은 직무의 변경이 있었지만, 모든 것을 통틀어 Blockchain이 가장 재미있다는 것을 알았습니다. 나름대로 많은 레퍼런스를 소유하고 있기 때문에 진행하시는 프로젝트에 Blockchain이 포함되어 있다면 도움을 드릴 수 있을 거라 확인합니다. 😉
    `;
    return (
        <ProfileBody>
            <div className="container">
                <ReactMarkdown children={markdown}/>
            </div>
        </ProfileBody>
    );
}
function Progressing() {
    const [provider] = useWeb3Modal();

    return (
        <ProfileBody>
            <div className="container">
                <div className="addr">
                0x2e6bE9855A3bF02C73Ba74B7d756a63DB7762238 와 약속 진행중
                </div>
                <Finalize provider={provider}></Finalize>
            </div>
        </ProfileBody>
    );
}

function Request() {
    const [provider] = useWeb3Modal();

    return (
        <ProfileBody>
            <div className="container">
                <div className="addr">
                0x2e6bE9855A3bF02C73Ba74B7d756a63DB7762238 의 요청
                </div>
                <div className="buttons">
                    <Confirm provider={provider}></Confirm>
                    <LinkButton style={{color: "#212736", background: "#F3F3F3", borderRadius: "199px"}}>거절</LinkButton>
                </div>
            </div>
        </ProfileBody>
    );
}

function Requested() {
    return (
        <ProfileBody>
            <div className="container">
                <LinkButton>Etherscan에서 확인하기</LinkButton>
            </div>
        </ProfileBody>
    );
}

export default Profile;