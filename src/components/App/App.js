import { useState } from "react";
import styled from "styled-components";
import gsap from "gsap";

import SelectBox from "../SelectBox";
import Books from "../Books";
import Slider from "../Slider";
import { LoadingSkeleton } from "../common";

import useBooks from "../../hooks/useBooks";

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

const Title = styled.h3`
  color: #414d5d;
`;

const slideTween = (elem, left) => {
  gsap.to(elem, {
    x: left,
    duration: 0.55,
    ease: "power2.out",
  });
};

function App() {
  const [destination, setDestination] = useState("");
  const { isLoading, error, books } = useBooks(destination);

  return (
    <Wrapper>
      <Title>Choose a book for your next trip</Title>
      <SelectBox
        disabled={isLoading}
        options={destinations}
        placeholder="Select a destination"
        onSelect={(value) => setDestination(value)}
      />
      {error && <div>{error}</div>}
      {isLoading && <LoadingSkeleton />}
      {books.length ? (
        <Slider depedency={destination} slideTween={slideTween}>
          <Books books={books} />
        </Slider>
      ) : null}
    </Wrapper>
  );
}

export default App;
