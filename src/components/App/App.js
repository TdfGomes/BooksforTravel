import { useState } from "react";
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

function App() {
  const [destination, setDestination] = useState("");
  const { isLoading, error, books } = useBooks(destination);

  return (
    <>
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
    </>
  );
}

export default App;
