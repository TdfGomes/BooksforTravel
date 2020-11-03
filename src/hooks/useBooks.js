import { useState, useEffect, useCallback } from "react";
import { getWorks, getBooks } from "../api/get";
import useGetLatest from "./useGetLatest";

function useBooks(destination) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const getWorksCallBack = useGetLatest(getWorks);
  const getBooksCallBack = useGetLatest(getBooks);

  const fetchWorks = getWorksCallBack();
  const fetchBooks = getBooksCallBack();

  const getWorksOrBooks = useCallback(async () => {
    setLoading(true);
    try {
      const works = await fetchWorks(destination);
      if (works.length < 3) {
        const books = await fetchBooks(destination);
        setBooks(books);
        return setLoading(false);
      }
      setBooks(works);
      return setLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [destination, fetchWorks, fetchBooks]);

  useEffect(() => {
    if (destination) {
      getWorksOrBooks();
    }
  }, [destination, getWorksOrBooks]);

  return { isLoading, error, books };
}

export default useBooks;
