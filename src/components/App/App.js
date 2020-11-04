import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";

import SelectBox from "../SelectBox";
import Books from "../Books";
import Button from "../SelectBox/Button";

import useBooks from "../../hooks/useBooks";
import useWidth from "../../hooks/useWidth";
import { Chevron } from "../Icons";

const destinations = [
  { label: "Barcelona", value: "barcelona" },
  { label: "Budapest", value: "budapest" },
  { label: "Bali", value: "bali" },
  { label: "Amsterdam", value: "amsterdam" },
  { label: "Porto", value: "porto" },
  { label: "Acapulco", value: "acapulco" },
  { label: "Rio de Janeiro", value: "rio_de_janeiro" },
];

const Wrapper = styled.div`
  width: 400px;
  height: 500px;
  border: 2px solid #6f7fce;
  margin: 50px auto;
  border-radius: 5px;
  background-color: #ececec;
  padding: 15px 25px;
`;

const Slider = styled.div`
  position: relative;
  margin-top: 35px;
  width: 100%;
`;

const SliderContainer = styled.div`
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

function App() {
  const [destination, setDestination] = useState("");
  const { isLoading, error, books } = useBooks(destination);
  const listRef = useRef();
  const containerRef = useRef();
  const slides = useRef(0);
  const { sliderWidth, activeSlidesWidth } = useWidth(
    listRef.current,
    destination
  );

  const manySlides = Math.floor(sliderWidth / activeSlidesWidth);

  useEffect(() => {
    slides.current = 0;
  }, [destination]);

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
    <Wrapper>
      <SelectBox
        disabled={isLoading}
        options={destinations}
        placeholder="Select a destination"
        onSelect={(value) => setDestination(value)}
      />
      <Slider>
        {isLoading && <div>Loading....</div>}
        {error && <div>{error}</div>}
        {books.length ? (
          <>
            <Arrows>
              <Button onClick={goLeft}>
                <Chevron direction="left" width={40} height={40} hover />
              </Button>
              <Button onClick={goRight}>
                <Chevron direction="right" width={40} height={40} hover />
              </Button>
            </Arrows>
            <SliderContainer ref={containerRef}>
              <Books books={books} width={sliderWidth} ref={listRef} />
            </SliderContainer>
          </>
        ) : null}
      </Slider>
    </Wrapper>
  );
}

export default App;
