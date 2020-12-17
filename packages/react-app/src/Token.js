import React from "react";
import { useCallback, useEffect, useState } from "react";
import Proptypes from "prop-types";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { ProfileBody, RowContainer, LeftContainer, RightContainer, Headline, Subline, InputContainer, TokenState, Button } from "./components";
import { addresses, abis } from "@project/contracts";
import { ethers, BigNumber, utils, Contract } from "ethers";
import { useHistory } from "react-router-dom";

function CreateToken({ provider, name, symbol, mint, requ, payback, price }) {
    const [managerFactory, setManagerFactory] = useState(undefined);
    let history = useHistory();

    const getManagerFactory = useCallback(async () => {
      const timerId = setTimeout(async () => {
        if (typeof(provider) !== "undefined") {
          const signer = provider.getSigner();
          const managerFactory = new Contract(
            addresses.MANAGER_FACTORY,
            abis.MANAGER_FACTORY_ABI,
            signer
          );
          setManagerFactory(managerFactory);
          clearTimeout(timerId);
        }
      }, 500);
    }, [provider]);

    useEffect(() => {
      if (!managerFactory) {
        getManagerFactory();
      }
    }, [managerFactory, getManagerFactory]);

    return (
      <Button style={{fontSize: '11px', lineHeight: '20px', padding: '4px 12px', borderRadius: '199px'}}
        onClick={async () => {
            console.log(name, symbol, mint, requ, payback, utils.parseEther(price).toString());
            if (typeof managerFactory !== "undefined") {
                const result = await managerFactory.callStatic.newManager(
                    name,
                    symbol,
                    utils.parseEther(mint),
                    utils.parseEther(requ),
                    utils.parseEther(requ).sub(utils.parseEther(payback)),
                    {
                        value: utils.parseEther(mint).mul(utils.parseEther(price)).div("1000000000000000000"),
                        gasLimit: BigNumber.from("4866690"),
                    }
                );
                await managerFactory.newManager(
                    name,
                    symbol,
                    utils.parseEther(mint),
                    utils.parseEther(requ),
                    utils.parseEther(requ).sub(utils.parseEther(payback)),
                    {
                        value: utils.parseEther(mint).mul(utils.parseEther(price)).div("1000000000000000000"),
                        gasLimit: BigNumber.from("4866690"),
                    }
                );
                history.push(`/${result.manager}`);
            }
        }}
      >
        {!provider ? "Provider not ready" : "토큰 생성하기"}
      </Button>
    );
}

function Token() {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [mint, setMint] = useState("");
    const [requ, setRequ] = useState("");
    const [price, setPrice] = useState("");
    const [payback, setPayback] = useState("");
    const [provider] = useWeb3Modal();

    const [value, setValue] = useState("");

    const getValue = useCallback(() => {
        setTimeout(() => {
            if (mint !== "" && price !== "") {
                const value = utils.parseEther(mint).mul(utils.parseEther(price)).div("1000000000000000000");
                console.log(utils.formatEther(value));
                setValue(utils.formatEther(value));
            }
        }, 500);
    });

    useEffect(() => {
        if (value.length <= 18) {
          getValue();
        }
    }, [getValue, value]);

    return (
        <>
        <ProfileBody>
            <RowContainer>
                <LeftContainer>
                    <Headline>새로운 토큰 만들기</Headline>
                    <Subline>한 번 토큰을 만들면, 이더리움 위에서 영구히 사용할 수 있습니다.</Subline>
                    <Field placeholder="토큰 이름(ex. Coffee)" onUpdate={setName}></Field>
                    <Field placeholder="토큰 심볼(ex. CFT)" onUpdate={setSymbol}></Field>
                    <Field placeholder="발행 수량" unit="개" onUpdate={setMint}></Field>
                    <Field placeholder="초기 가격" unit="ETH" onUpdate={setPrice}></Field>
                    <Field placeholder="사용 최소 수량" unit="개" onUpdate={setRequ}></Field>
                    <Field placeholder="페이백 시 되돌려줄 토큰 수량" unit="개" onUpdate={setPayback}></Field>
                </LeftContainer>
                <RightContainer>
                    <TokenState>
                        <div className="receipt">
                            <div className="expenses">
                                <div className="label">발행 수량 ⅹ 초기 가격</div>
                                <div className="detail">{value} ETH</div>
                            </div>
                            <div className="expenses">
                                <div className="label">토큰 생성 비용</div>
                                <div className="detail">0.000 ETH</div>
                            </div>
                            <div className="expenses">
                                <div className="label">총 비용</div>
                                <div className="detail final">{value} ETH</div>
                            </div>
                        </div>
                        <CreateToken provider={provider} name={name} symbol={symbol} mint={mint} requ={requ} price={price} payback={payback}/>
                    </TokenState>
                </RightContainer>
            </RowContainer>
        </ProfileBody>
        </>
    );
}

const Field = ({placeholder, unit, onUpdate}) => {

    return (
        <>
        <InputContainer>
            <input placeholder={placeholder} onChange={(e) => {onUpdate(e.target.value);}}/>
            {unit !== "" ? <div>{unit}</div> : null }
        </InputContainer>
        </>
    );
}

Field.propTypes = {
    placeholder: Proptypes.string,
    unit: Proptypes.string
}

export default Token;
