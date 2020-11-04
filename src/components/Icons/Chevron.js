import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Svg from "./Svg";

function ChevronIcon({ className }) {
  return (
    <Svg className={className}>
      <path
        fill="currentColor"
        d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </Svg>
  );
}

ChevronIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

const direction = (direction) => {
  switch (direction) {
    case "top":
      return "rotate(90deg)";
    case "right":
      return "rotate(-90deg)";
    case "left":
      return "rotate(90deg)";
    default:
      return "rotate(0)";
  }
};

const Chevron = styled(ChevronIcon)`
  cursor: pointer;
  transform: ${(props) => direction(props.direction)};
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  height: ${(props) => (props.height ? `${props.height}px` : "auto")};
  ${(props) =>
    props.hover &&
    css`
      opacity: 0.7;
      will-change: opacity;
      transition: opacity 250ms ease-in;
      &:hover {
        opacity: 1;
      }
    `}
`;

Chevron.defaultProps = {
  hover: false,
};

Chevron.propTypes = {
  direction: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  hover: PropTypes.bool.isRequired,
};

export default Chevron;
