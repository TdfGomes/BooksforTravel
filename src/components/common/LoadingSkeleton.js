import styled, { keyframes } from "styled-components";

const flashing = keyframes`
  0%{transform:translate(-550%) skew(-15deg,0)}
  25%{transform:translate(550%) skew(-15deg,0)}
  to{transform:translate(550%) skew(-15deg,0)}
`;

const fading = keyframes`
  from{opacity: 0.6}
  25%{opacity:1}
  50%{opacity: 0.6}
  75%{opacity:1}
  to{opacity:0.6}
`;

const PlaceHolder = styled.div`
  width: 135px;
  height: 185px;
  background-color: #d7dfea;
  position: relative;
  flex: 1 0 auto;
  overflow: hidden;
  margin: 35px 15px;
  border-radius: 5px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 25%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, 0.5);
    filter: blur(14px);
    animation: ${flashing} 5s ease-in infinite;
  }
  &:after {
    left: -25%;
    animation-delay: 0.25s;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  animation: ${fading} 2.5s ease-in infinite;
`;

function LoadSkeleton() {
  return (
    <Wrapper>
      <PlaceHolder />
      <PlaceHolder />
    </Wrapper>
  );
}

export default LoadSkeleton;
