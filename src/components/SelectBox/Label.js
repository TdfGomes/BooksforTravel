import styled from "styled-components";

const Label = styled.div`
  font-size: 20px;
  line-height: 1;
  color: #414d5d;
  text-transform: capitalize;
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

Label.displayName = "Label";

export default Label;
