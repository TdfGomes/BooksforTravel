import { API_URL } from "./url";
/**
 *
 * @param {string} destination
 */
export const getWorks = async (destination) => {
  const response = await fetch(`${API_URL}/subjects/${destination}.json`);
  const { works } = await response.json();
  return works;
};

/**
 *
 * @param {string} destination
 */
export const getBooks = async (destination) => {
  const res = await fetch(`${API_URL}/search.json?q=${destination}`);
  const { docs } = await res.json();
  const queryBooks = docs.map(async (qB) => {
    const bookPath = qB.seed.find((book) => /books/gi.test(book));
    const res = await fetch(`${API_URL}${bookPath}.json`);
    return res.json();
  });
  const allBooks = await Promise.all(queryBooks);
  return allBooks;
};
