import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const List = styled.ul`
  position: absolute;
  width: 100%;
  left: 0;
  top: 45px;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0px 5px 7px -2px rgba(80, 80, 80, 0.2);
  will-change: opacity;
  animation: ${fadeIn} 300ms linear;
  z-index: 99;
`;

List.displayName = "List";

export default List;
