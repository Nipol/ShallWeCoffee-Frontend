import React from 'react';
import web3 from "../src/ethereum/Web3";
import './CreateToken.css';

function CreateToken() {
    var tokenName;
    var tokenSymbol;
    var tokenSymbol;
    var initialPrice;
    var minAmnt;
    var paybackAmnt;
    var isValid = true;

    /*
    TODO:
    1. Deploy 누르면 -> contract deploy 호출
    2. 에러메세지 표시 (완성 O 체크 X +return false? multiple 인 경우 언제?)
    3. 디플로이시 redirect to myprofile
    4. 언어 설정
    */
    useEffect(() => {
        async function fetchData() {
        let mf = await manager()
        setAccount(accounts);
        }
        fetchData();
    }, [])

    function setTokenInfo(event) {
        event.preventDefault();
        tokenName = document.getElementById('tokenName').value;
        tokenSymbol = document.getElementById('tokenSymbol').value;
        tokenAmount = document.getElementById('tokenAmount').value;
        initialPrice = document.getElementById('initialPrice').value;
        minAmnt = document.getElementById('minAmnt').value;
        paybackAmnt = document.getElementById('paybackAmnt').value;

        /* 질문: New Manager 에 totalAmount = mintingamnt , mintingamnt = minAmnt? */

        if (isValid) {
            makeManager(tokenName, tokenSymbol, tokenAmount, minAmnt, paybackAmnt);
        }
    }

    function makeManager() {

    }

    function validate() {
        if (document.tokenInfo.tokname.value.length == '0') {document.getElementById("error").innerHTML = "Should not leave as blank";};
        if (document.tokenInfo.toksymbol.value.length < 3) {document.getElementById("error").innerHTML = "Token symbol length should be >= 3";};
        if (document.tokenInfo.toktot.value < 1) {document.getElementById("error").innerHTML = "Should deploy >= 1 token";};
        if (document.tokenInfo.tokinit.value <= 0) {document.getElementById("error").innerHTML = "Token price should be greater than zero";};
        if (document.tokenInfo.tokmin.value <= 0 ) {document.getElementById("error").innerHTML = "Minimum usage should be greater than zero";};
        if (document.tokenInfo.tokpayback.value > minUse) {document.getElementById("error").innerHTML = "Payingback amount should be <= min use";};
    }
    return(
        <div class="generalcell">
             <div class="guidecell">
                <h1>토큰 만들기</h1>
                <p>
                한번 토큰을 만들면, 영구히 이더리움 블록체인 위에서 사용할 수 있습니다.
                <br></br>
                거래에서 만든 약속부터 이용까지 한번에 가능합니다. 토큰을 만들고 네트워킹을 해보세요!
                </p>
             </div>
             <div class="tokenset">
                 <h3>기본 정보</h3>
                 <form name="tokenInfo">
                     <input class="infoinput" name="tokname"
                         type="text" id="tokenName"
                         placeholder="토큰이름 (ex. Coffee Token)" onblur="validate()" ></input> <div id="error"></div>
                     <br></br>
                     <input class="infoinput" name="toksymbol"
                         type="text" id="tokenSymbol" 
                         placeholder="토큰심볼 (ex. CTN)" onblur="validate()"></input> <div id="error"></div>
                     <br></br>
                     <input class="infoinput" name="toktot"
                         type="number" id="tokenAmount"
                          placeholder="발행수량" onblur="validate()" ></input> <div id="error"></div>
                     <br></br>
                     <input class="infoinput" name="tokinit"
                         type="number" id="initialPrice"
                         placeholder="초기가격" onblur="validate()"></input> <div id="error"></div>
                     <br></br>
                 </form>
             </div>
             <div class="burntoken">
                 <h3>약속 관리</h3>
                 <input class="infoinput" name="tokmin"
                     type="number" id="minAmnt"
                     placeholder="최소 토큰 사용개수" onblur="validate()"></input>
                 <br></br>
                 <input class="infoinput" name="tokpayback"
                     type="number" id="paybackAmnt"
                     placeholder="되돌려줄 토큰 개수" onblur="validate()"></input>
                 <p>
                 약속 관리에서, 필요에 따라 만난 사람에게 토큰을 일부 돌려줄 수 있어요!
                 <br></br>
                 원하는 갯수를 설정하세요.
                 </p>
             </div>
             <div class="deployplatform">
                 <h3> 토큰을 만들기 위해 필요한 이더리움 </h3>
                 <br></br>
                 <button class="deploybtn">만들기</button>
             </div>
        </div>
    );
}