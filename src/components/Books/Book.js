import styled from "styled-components";
import PropTypes from "prop-types";
import ImgPlaceHolder from "./ImgPlaceHolder";

const StyledBook = styled.li``;

function Book({ title, bKey, coverID }) {
  return (
    <StyledBook>
      <a href={encodeURI(`https://openlibrary.org${bKey}/${title}`)}>
        <p>{title}</p>
        {coverID ? (
          <img
            alt={title}
            src={`https://covers.openlibrary.org/b/id/${coverID}-S.jpg`}
          />
        ) : (
          <ImgPlaceHolder />
        )}
      </a>
    </StyledBook>
  );
}

Book.displayName = "Book";

Book.propTypes = {
  title: PropTypes.string.isRequired,
  bKey: PropTypes.string.isRequired,
  coverID: PropTypes.number,
};

export default Book;
