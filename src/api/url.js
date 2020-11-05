export const API_URL = "https://openlibrary.org";

/**
 *
 * @param {number} coverID should also include the size like img-S, img-M or img-L
 */
export const coverUrl = (coverID) =>
  encodeURI(`https://covers.openlibrary.org/b/id/${coverID}.jpg`);

/**
 *
 * @param {string} bKey
 * @param {string} title
 */
export const bookHerf = (bKey, title) =>
  encodeURI(`https://openlibrary.org${bKey}/${title}`);
