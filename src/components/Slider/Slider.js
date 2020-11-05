import { Children, cloneElement, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Button } from "../common";
import { Chevron } from "../Icons";

import useWidth from "../../hooks/useWidth";

const SliderContainer = styled.div`
  position: relative;
  margin-top: 45px;
  width: 100%;
`;

const SliderOverFlow = styled.div`
  overflow: hidden;
  display: inline-block;
  width: 100%;
  position: relative;
  z-index: 10;
`;

const Arrows = styled.div`
  width: calc(100% + 60px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #414d5d;
  position: absolute;
  left: -30px;
  top: 40%;
  transform: translateY(-50%);
`;

function Slider({ children, depedency, tweenLeft, tweenRight }) {
  const listRef = useRef();
  const slides = useRef(0);
  const { sliderWidth, activeSlidesWidth } = useWidth(
    listRef.current,
    depedency
  );

  const manySlides = Math.floor(sliderWidth / activeSlidesWidth);

  useEffect(() => {
    slides.current = 0;
  }, [depedency]);

  const goLeft = (e) => {
    e.preventDefault();

    if (slides.current + 1 < manySlides) {
      slides.current++;
      tweenLeft(listRef.current, activeSlidesWidth);
    }
  };

  const goRight = (e) => {
    e.preventDefault();

    if (slides.current > 0) {
      slides.current--;
      tweenRight(listRef.current, activeSlidesWidth);
    }
  };

  return (
    <SliderContainer>
      {children && (
        <>
          <Arrows aria-label="arrows">
            <Button onClick={goLeft} aria-label="slide left">
              <Chevron direction="left" width={40} height={40} hover />
            </Button>
            <Button onClick={goRight} aria-label="slide right">
              <Chevron direction="right" width={40} height={40} hover />
            </Button>
          </Arrows>
          <SliderOverFlow aria-label="slider inner container">
            {Children.map(children, (child) =>
              cloneElement(child, {
                ...child.props,
                width: sliderWidth,
                ref: listRef,
              })
            )}
          </SliderOverFlow>
        </>
      )}
    </SliderContainer>
  );
}

Slider.propTypes = {
  children: PropTypes.element,
  depedency: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  tweenLeft: PropTypes.func.isRequired,
  tweenRight: PropTypes.func.isRequired,
};

export default Slider;
