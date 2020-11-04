import styled from "styled-components";

const ImgPlaceHolder = styled.div`
  width: 99%;
  height: 190px;
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid #414d5d;
  background-color: #d7dfea;
  text-align: center;
  position: relative;
  &:after {
    content: "";
    width: 60%;
    height: 70%;
    border: 1px solid hsl(214deg 18% 31% / 60%);
    border-radius: 2px;
    background: transparent;
    z-index: 9;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:before {
    content: "Image Not Found!";
    color: #414d5d;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

ImgPlaceHolder.displayName = "ImgPalceHolder";

export default ImgPlaceHolder;
