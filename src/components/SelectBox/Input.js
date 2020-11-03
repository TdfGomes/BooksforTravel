import styled from "styled-components";

const Input = styled.input`
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  width: 100%;
  font-size: 20px;
  line-height: 1;
  color: #414d5d;
  outline: none;
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

Input.displayName = "Input";

export default Input;
