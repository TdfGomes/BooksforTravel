import styled from "styled-components";
import PropTypes from "prop-types";

import Book from "./Book";

const StyledBooks = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

function Books({ books, width }) {
  return (
    <StyledBooks style={{ width }}>
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
  width: PropTypes.number.isRequired,
};

export default Books;
