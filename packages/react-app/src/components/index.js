import styled from "styled-components";

export const Header = styled.header`
  background-color: #fff;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: 2C303D;
  
  & > div.left {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > img {
      margin: 0 14px;
      width: 200px;
      height: 20px;
    }
  }

  & > div.right {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

`;

export const ContentBody = styled.body`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #2C303D;
  min-height: calc(100vh - 70px);
`;

export const Body = styled.body`
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #2C303D;
  min-height: calc(100vh - 70px);
`;

export const ProfileBody = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  width: 100%;

  & > div.container {
    margin:0 3rem;
    width: 940px;
    padding-right: 500px;

    & > div {
      margin: 0 1rem;
      width: 200px;
    }
  }
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const LogoImage = styled(Image)`
  height: 40px;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;

export const Button = styled.button`
  background-color: #212736;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  margin: 0px 20px;
  padding: 12px 24px;

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;

export const LinkButton = styled.div`
  background-color: #212736;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  // margin: 0px 20px;
  padding: 12px 24px;

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }

  & > a {
    color: inherit;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    text-decoration: none; outline: none
  }

  & > a:hover, a:active {
    text-decoration: none;
  } 
`;

export const HeadButton = styled(Button)`
  flex: none;
  flex-grow: 0;
  margin: 16px auto;
`;

export const Headline = styled.h1`
  magrin: 0 16px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 70px;
  color: #2C303D;

  flex: none;
  flex-grow: 0;
  margin: 16px 20px;
`;
  
export const LandHeadline = styled(Headline)`
  margin: 16px auto;
  text-align: center;
`;

export const Subline = styled.h2`
  magrin: 0 16px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #2C303D;
  opacity: 0.8;
  
  flex: none;
  flex-grow: 0;
  margin: 16px 20px;
`;
  
export const LandSubline = styled(Subline)`
  margin: 16px auto;
  text-align: center;
`;

export const Jumbotron = styled.div`
  background-color: #fcfcfc;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div.container {
    width: 1440px;
    display: flex;
    flex-direction: row;

    & > div.pic {
      height: 100px;
    }

    & > div.info {
      margin-left: 2rem;
      height: 72px;
      display: flex;
      flex-direction: column;

      h1 {
        margin: 0.5rem 0;
      }

      legend {
        color: #2C303D;
        opacity: 0.6;
        margin: 6px 0;

        img {
          margin-right: 5px;
        }
      }
    }
  }
`;

export const ProfilePic = styled.div`
  width: 100px;
  height: 100px;
  background: #F3F3F3;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04);
  border-radius: 1000px;
  color: #2C303D;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 1000px;
  }
`;

export const RowContainer = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ColumnContainer = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const LeftContainer = styled.div`
  width: 880px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RightContainer = styled.div`
  width: 560px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const GreyBack = styled.div`
  background: #FCFCFC;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;

  & > div.receipt {
    display: flex;
    flex-direction: column;
    background: #FCFCFC;
    border-radius: 6px;
    padding: 0 1rem;

    & > div.expenses {
      margin: 12px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      & > div.label {
        display: inline-flex;
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        color: #2C303D;
        opacity: 0.6;
      }

      & > div.detail {
        display: inline-flex;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        color: #2C303D;

        &.final {
          color: #71230B;
          font-weight: 700;
        }
      }
    }
  }
`;

export const TokenState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  width: 380px;
  background: #FFFFFF;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.04);
  border-radius: 6px;

  & > div.receipt {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 12px 12px;
    background: #FCFCFC;
    border-radius: 6px;
    margin: 0px 32px;

    & > div.expenses {
      margin: 12px 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      & > div.label {
        display: inline-flex;
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        color: #2C303D;
        opacity: 0.6;
      }

      & > div.detail {
        display: inline-flex;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        color: #2C303D;

        &.final {
          color: #71230B;
          font-weight: 700;
        }
      }
    }
  }

  & > button {
    width: 100%;
    border-radius: 199px;
  }
`;

export const TokenStates = styled.div`
  position: absolute;
  padding: 32px;
  width: 380px;
  background: #FFFFFF;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.04);
  border-radius: 6px;

  & > div.react-tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-around;

    ul li {
      list-style-type: none;
    }

    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-around;
    }

    li {
      opacity: 0.2;
      color: #71230B;
      font-family: Noto Sans KR;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 34px;

      &.react-tabs__tab--selected {
        opacity: 1;
      }
    }
  }

  & > div.detail {
    display: flex;
    flex-direction: row;

    & > div.pic {
      height: 72px;
    }

    & > div.info {
      margin-left: 1rem;
      height: 72px;
      display: flex;
      flex-direction: column;
    }
  }

  & > div.receipt {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 3rem;

    & > div.expenses {
      margin: 12px 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: align-items;

      & > div.label {
        display: inline-flex;
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        color: #2C303D;
        opacity: 0.6;
      }

      & > div.detail {
        display: inline-flex;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        color: #2C303D;

        &.final {
          color: #71230B;
          font-weight: 700;
        }
      }
    }
  }

  & > h4 {
    color: #2C303D;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    margin: 1rem auto;
  }

  & > div.legend {
    color: #2C303D;
    opacity: 0.6;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    margin: 1rem auto;
  }

  & > button {
    border-radius: 199px;
    width: 100%;
    margin: 1rem auto;
  }
`;

export const MiniNav = styled.nav`
  margin-top: -35px;
  max-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: space-around;
  padding: 14px 20px;
  background: #FFFFFF;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.04);
  border-radius: 6px;

  & > a {
    margin: 0 1rem;
    opacity: 0.2;
    color: #71230B;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 34px;
    text-decoration: none; outline: none
  }

  & > a:hover, a:active {
    text-decoration: none;
  } 
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > input {
    width: 100%;
    padding: 20px;
    margin: 14px 24px;
    background: #FFFFFF;
    border: 1px solid #EAEAED;
    box-sizing: border-box;
    border-radius: 6px;
  }

  & > div {
    padding: 20px;
    margin: 14px 24px;
    position: absolute;
    right: 0;
  }
`;
