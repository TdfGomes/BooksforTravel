import { useRef, useState } from "react";
import styled from "styled-components";

import SelectBox from "../SelectBox";
import Books from "../Books";
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
  overflow-x: scroll;
  overflow-y: auto;
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
  const totalWidth = useWidth(listRef.current, destination);

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
              <Chevron
                color="#414d5d"
                direction="left"
                width={40}
                height={40}
                hover
              />
              <Chevron
                color="#414d5d"
                direction="right"
                width={40}
                height={40}
                hover
              />
            </Arrows>
            <SliderContainer>
              <Books books={books} width={totalWidth} ref={listRef} />
            </SliderContainer>
          </>
        ) : null}
      </Slider>
    </Wrapper>
  );
}

export default App;
