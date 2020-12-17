import React from "react";
import { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import link from "./link.svg";
import pin from "./pin.svg";
import work from "./work.svg";
import pic from "./photo1-2.jpg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import { Body, Jumbotron, ProfilePic, MiniNav, ProfileBody, InputContainer, GreyBack, Headline, TokenStates, RowContainer, LinkButton, ColumnContainer } from "./components";
import { useHistory } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import useWeb3Modal from "./hooks/useWeb3Modal";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Proptypes from "prop-types";

const Profile = () => {
    const [provider, loadWeb3Modal] = useWeb3Modal();
    let { path, url } = useRouteMatch();

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
                                <img src={pic}></img>
                            </ProfilePic>
                        </div>
                        <div className="info">
                            <h1>최윤성</h1>
                            <legend><img src={work}/>DSRV Labs</legend>
                            <legend><img src={pin}/>서울</legend>
                            {/* <legend><img src={link}/>https://www.facebook.com/me/</legend> */}
                        </div>
                    </div>
                </Jumbotron>
                <RowContainer>
                    <MiniNav>
                        <NavLink activeStyle={activeStyle} to={`${url}`}>프로필</NavLink>
                        <NavLink activeStyle={activeStyle} to={`${url}/requested`}>요청한 약속</NavLink>
                    </MiniNav>
                </RowContainer>

                <ColumnContainer>
                    <TokenStates style={{marginTop: '-220px'}}>
                        <div className="detail">
                            <div className="pic">
                                <ProfilePic/>
                            </div>
                            <div className="info">
                                <h4>WITH☕️</h4>
                                <div className="legend">0x0...</div>
                            </div>
                        </div>
                        <div className="receipt">
                            <div className="expenses">
                                <div className="label">현재 가격</div>
                                <div className="detail">ETH</div>
                            </div>
                            <div className="expenses">
                                <div className="label">남은 개수</div>
                                <div className="detail">개</div>
                            </div>
                        </div>
                        
                    </TokenStates>

                    <TokenStates style={{marginTop: '90px'}}>
                        <Tabs>
                            <TabList>
                                <Tab>구매</Tab>
                                <Tab>판매</Tab>
                                <Tab>약속하기</Tab>
                            </TabList>

                            <TabPanel>
                                <Field placeholder="구매할 토큰 수량" unit="WITH"></Field>
                                <GreyBack>
                                    <div className="receipt">
                                        <div className="expenses">
                                            <div className="label">보유 이더리움</div>
                                            <div className="detail">ETH</div>
                                        </div>
                                        <div className="expenses">
                                            <div className="label">구매 금액</div>
                                            <div className="detail">ETH</div>
                                        </div>
                                    </div>
                                </GreyBack>
                                <LinkButton>구매하기</LinkButton>
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
                                            <div className="detail">WITH</div>
                                        </div>
                                        <div className="expenses">
                                            <div className="label">필요 토큰 수량</div>
                                            <div className="detail">WITH</div>
                                        </div>
                                    </div>
                                </GreyBack>
                                <LinkButton>약속하기</LinkButton>
                            </TabPanel>
                        </Tabs>
                    </TokenStates>
                </ColumnContainer>

                <Switch>
                    <Route exact path={path}>
                        <Desc />
                    </Route>
                    <Route path={`${path}/:cate`}>
                        <Requested />
                    </Route>
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

function Requested() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { cate } = useParams();

    return (
        <ProfileBody>
            <div className="container">
                <LinkButton>Etherscan에서 확인하기</LinkButton>
            </div>
        </ProfileBody>
    );
}

const Field = ({placeholder, unit}) => {

    return (
        <>
        <InputContainer>
            <input placeholder={placeholder}/>
            {unit !== "" ? <div>{unit}</div> : null }
        </InputContainer>
        </>
    );
}

Field.propTypes = {
    placeholder: Proptypes.string,
    unit: Proptypes.string
}

export default Profile;