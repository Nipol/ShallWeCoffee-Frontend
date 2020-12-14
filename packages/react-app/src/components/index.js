import styled from "styled-components";

export const Header = styled.header`
  background-color: #fcfcfc;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: 2C303D;
`;

export const Body = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fcfcfc;
  color: #2C303D;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
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
  text-align: center;
  color: #2C303D;

  flex: none;
  flex-grow: 0;
  margin: 16px auto;
`;

export const Subline = styled.h2`
  magrin: 0 16px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #2C303D;
  opacity: 0.8;

  flex: none;
  flex-grow: 0;
  margin: 16px auto;
`;
