import styled from "styled-components";
import PropTypes from "prop-types";

import Book from "./Book";
import { forwardRef } from "react";

const StyledBooks = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline-block;
`;

const Books = forwardRef(({ books, width }, ref) => (
  <StyledBooks style={{ width }} ref={ref}>
    {books.map(({ cover_id, key, title }, idx) => (
      <Book key={idx} coverID={cover_id} bKey={key} title={title} />
    ))}
  </StyledBooks>
));

Books.dispalyName = "Books";

Books.defaultProps = {
  width: "100%",
};

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      cover_id: PropTypes.number,
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Books;
