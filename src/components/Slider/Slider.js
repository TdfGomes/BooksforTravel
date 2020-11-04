import { Children, cloneElement, forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

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

const Slider = forwardRef(({ children, depedency }, ref) => {
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
      gsap.to(listRef.current, {
        x: `-=${activeSlidesWidth}`,
        duration: 0.55,
        ease: "power2.out",
      });
    }
  };

  const goRight = (e) => {
    e.preventDefault();

    if (slides.current > 0) {
      slides.current--;
      gsap.to(listRef.current, {
        x: `+=${activeSlidesWidth}`,
        duration: 0.55,
        ease: "power2.out",
      });
    }
  };

  return (
    <SliderContainer>
      {children && (
        <Arrows>
          <Button onClick={goLeft}>
            <Chevron direction="left" width={40} height={40} hover />
          </Button>
          <Button onClick={goRight}>
            <Chevron direction="right" width={40} height={40} hover />
          </Button>
        </Arrows>
      )}
      <SliderOverFlow ref={ref}>
        {Children.map(children, (child) =>
          cloneElement(child, {
            ...child.props,
            width: sliderWidth,
            ref: listRef,
          })
        )}
      </SliderOverFlow>
    </SliderContainer>
  );
});

export default Slider;
