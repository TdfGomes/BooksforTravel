import styled from "styled-components";
import PropTypes from "prop-types";
import ImgPlaceHolder from "./ImgPlaceHolder";

const StyledBook = styled.li`
  text-align: center;
  width: 80px;
  margin: 5px 15px;
`;

const BookLink = styled.a`
  text-decoration: none;
  color: #414d5d;
  font-size: 14px;
  text-align: center;
`;

// const Title = styled.p`

// `

function Book({ title, bKey, coverID }) {
  return (
    <StyledBook>
      <BookLink href={encodeURI(`https://openlibrary.org${bKey}/${title}`)}>
        {coverID ? (
          <img
            alt={title}
            src={`https://covers.openlibrary.org/b/id/${coverID}-S.jpg`}
          />
        ) : (
          <ImgPlaceHolder />
        )}
        <p>{title}</p>
      </BookLink>
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
