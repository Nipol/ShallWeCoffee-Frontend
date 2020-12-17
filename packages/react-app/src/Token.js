import React from "react";
import Proptypes from "prop-types";
import { ProfileBody, RowContainer, LeftContainer, RightContainer, Headline, Subline, InputContainer, TokenState, Button } from "./components";

function Token() {
    return (
        <>
        <ProfileBody>
            <RowContainer>
                <LeftContainer>
                    <Headline>새로운 토큰 만들기</Headline>
                    <Subline>한 번 토큰을 만들면, 이더리움 위에서 영구히 사용할 수 있습니다.</Subline>
                    <Field placeholder="토큰 이름(ex. Coffee)"></Field>
                    <Field placeholder="토큰 심볼(ex. CFT)"></Field>
                    <Field placeholder="발행 수량" unit="개"></Field>
                    <Field placeholder="초기 가격" unit="ETH"></Field>
                    <Field placeholder="페이백 시 되돌려줄 토큰 수량" unit="개"></Field>
                </LeftContainer>
                <RightContainer>
                    <TokenState>
                        <div className="receipt">
                            <div className="expenses">
                                <div className="label">발행 수량 ⅹ 초기 가격</div>
                                <div className="detail">ETH</div>
                            </div>
                            <div className="expenses">
                                <div className="label">토큰 생성 비용</div>
                                <div className="detail">0 ETH</div>
                            </div>
                            <div className="expenses">
                                <div className="label">총 비용</div>
                                <div className="detail final">ETH</div>
                            </div>
                        </div>
                        <Button>
                            토큰 생성하기
                        </Button>
                    </TokenState>
                </RightContainer>
            </RowContainer>
        </ProfileBody>
        </>
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

export default Token;
