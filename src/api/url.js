export const API_URL = "https://openlibrary.org";

/**
 *
 * @param {number} coverID
 */
export const coversUrl = (coverID) =>
  encodeURI(`https://covers.openlibrary.org/b/id/${coverID}-S.jpg`);

/**
 *
 * @param {string} bKey
 * @param {string} title
 */
export const bookHerf = (bKey, title) =>
  encodeURI(`https://openlibrary.org${bKey}/${title}`);
