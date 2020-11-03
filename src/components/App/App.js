import { useState } from "react";
import styled from "styled-components";

import SelectBox from "../SelectBox";
import Books from "../Books";
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
  width: 325px;
  height: 500px;
  border: 2px solid #6f7fce;
  margin: 50px auto;
  border-radius: 5px;
  background-color: #ececec;
  padding: 15px;
`;

function App() {
  const [destination, setDestination] = useState("");
  const { isLoading, error, books } = useBooks(destination);

  return (
    <Wrapper>
      <SelectBox
        disabled={isLoading}
        options={destinations}
        placeholder="Select a country"
        onSelect={(value) => setDestination(value)}
      />
      <div>
        {isLoading && <div>Loading....</div>}
        {error && <div>{error}</div>}
        {books && <Books books={books} />}
      </div>
    </Wrapper>
  );
}

export default App;
