import React from "react";
import { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import { Body, Jumbotron, ProfilePic, MiniNav, ProfileBody, Subline, ColumnContainer, Headline, TokenStates, RowContainer, LinkButton } from "./components";
import { useHistory } from "react-router-dom";
import useWeb3Modal from "./hooks/useWeb3Modal";

const Create = () => {
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
                        <ProfilePic/>
                    </div>
                </Jumbotron>
                <RowContainer>
                    <MiniNav>
                        <NavLink activeStyle={activeStyle} to={`${url}`}>프로필</NavLink>
                    </MiniNav>
                </RowContainer>

                <ColumnContainer>
                    <TokenStates style={{marginTop: '-250px'}}>
                        <h4>발행한 토큰이 없어요</h4>
                        <div className="legend">나만의 토큰을 만들어보세요. <br/>발행한 토큰을 다른 사람이 구입할 수 있어요.</div>
                        <LinkButton>
                            <Link to={`/token`}>토큰 만들기</Link>
                        </LinkButton>
                    </TokenStates>
                </ColumnContainer>

                <Switch>
                    <Route exact path={path}>
                        <Intro/>
                    </Route>
                </Switch>
            </Body>
        </>
    );
}

function Intro() {
    return (
        <ProfileBody>
            <div className="container">
                <Headline>소개를 작성하세요</Headline>
                <Subline>매력적인 소개로 더 많은 사람과 만나보세요.</Subline>
                <LinkButton>
                    <Link to={`/token`}>토큰 만들기</Link>
                </LinkButton>
            </div>
        </ProfileBody>
    );
}

function Sam() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams();

    return (
        <ProfileBody>
            <div className="container">
                <h3>{topicId}</h3>
            </div>
        </ProfileBody>
    );
  }

export default Create;