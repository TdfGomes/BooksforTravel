import { useEffect, useState } from "react";
import SelectBox from "../SelectBox";
import Books from "../Books";

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

  const [isLoading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      setBooks([]);
      const response = await fetch(
        `https://openlibrary.org/subjects/${destination}.json`
      );
      const { works } = await response.json();
      if (works.length < 3) {
        const res = await fetch(
          `http://openlibrary.org/search.json?q=${destination}`
        );
        const { docs } = await res.json();
        const queryBooks = docs.map(async (qB) => {
          const bookPath = qB.seed.find((book) => /books/gi.test(book));
          const res = await fetch(`http://openlibrary.org${bookPath}.json`);
          return res.json();
        });
        const allBooks = await Promise.all(queryBooks);
        setBooks(allBooks);
        return setLoading(false);
      }
      setBooks(works);
      setLoading(false);
    };
    if (destination) {
      getBooks();
    }
  }, [destination]);

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
        {books && <Books books={books} />}
      </div>
    </>
  );
}

export default App;
