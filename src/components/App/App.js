import { useEffect, useRef, useState } from "react";

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
  const [inputValue, setInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [isListVisible, setVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const options = useRef(destinations);

  useEffect(() => {
    setVisibility(false);
    const getBooks = async () => {
      setLoading(true);
      setBooks([]);
      const response = await fetch(
        `https://openlibrary.org/subjects/${selectValue.value}.json`
      );
      const { works } = await response.json();
      if (works.length < 3) {
        const res = await fetch(
          `http://openlibrary.org/search.json?q=${selectValue.value}`
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
    if (selectValue) {
      getBooks();
    }
  }, [selectValue]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const clearSelect = (e) => {
    e.preventDefault();
    setSelectValue("");
    setInput("");
  };

  const filteredOpts = options.current.filter(({ value }) =>
    new RegExp(inputValue, "ig").test(value)
  );

  return (
    <>
      <div>
        <div>
          {selectValue && <div>{selectValue.label}</div>}
          <input
            type="text"
            aria-label="input-select"
            placeholder="Select a country"
            onChange={handleChange}
            value={inputValue}
            onFocus={() => setVisibility(true)}
            disabled={isLoading}
            onBlur={() => setVisibility(false)}
          />
          <button onClick={clearSelect} disabled={isLoading}>
            X
          </button>
        </div>
        {isListVisible && (
          <ul role="listbox">
            {filteredOpts.map(({ label, value }, idx) => (
              <li
                onMouseDown={() => setSelectValue({ label, value })}
                key={`${idx}-${value}`}
                isfocused={(selectValue.value === value).toString()}>
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {isLoading && <div>Loading....</div>}
        {books && (
          <ul>
            {books.map((book, idx) => (
              <li key={idx}>
                <a
                  href={encodeURI(
                    `https://openlibrary.org${book.key}/${book.title}`
                  )}>
                  <p>{book.title}</p>
                  <img
                    alt={book.title}
                    src={`https://covers.openlibrary.org/b/id/${book?.cover_id}-S.jpg`}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
