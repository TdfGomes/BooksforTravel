import { useState, useEffect } from "react";

function useBooks(destination) {
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

  return { isLoading, books };
}

export default useBooks;
