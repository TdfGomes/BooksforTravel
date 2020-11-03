import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: none;
  color: #414d5d;
  font-size: 20px;
  line-height: 1;
  text-transform: uppercase;
  font-weight: 800;
  outline: none;
  padding-top: 5px;
  position: relative;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 250ms ease-in;
  &:hover {
    opacity: 1;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

Button.displayName = "Button";

export default Button;
