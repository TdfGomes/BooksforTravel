import styled from "styled-components";
import PropTypes from "prop-types";

import Book from "./Book";

const StyledBooks = styled.ul``;

function Books({ books }) {
  return (
    <StyledBooks>
      {books.map(({ cover_id, key, title }, idx) => (
        <Book key={idx} coverID={cover_id} bKey={key} title={title} />
      ))}
    </StyledBooks>
  );
}

Books.dispalyName = "Books";

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      cover_id: PropTypes.number,
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Books;
