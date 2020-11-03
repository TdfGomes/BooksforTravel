import styled, { css } from "styled-components";

const Option = styled.li`
  margin: 5px 0;
  padding: 5px 10px;
  font-size: 20px;
  line-height: 1;
  transition: background-color 250ms ease-in;
  color: ${(props) => (!props.isFocused ? "#414d5d" : "#fff")};
  background-color: ${(props) =>
    !props.isFocused ? "transparent" : "#414d5d"};
  cursor: pointer;
  ${(props) =>
    props.isFocused
      ? css`
          background-color: #414d5d;
          color: #fff;
        `
      : css`
          color: #414d5d;
          background-color: transparent;
          &:hover {
            background-color: #d7dfea;
          }
        `}
`;

Option.displayName = "Option";

export default Option;
