import styled from "styled-components";
import PropTypes from "prop-types";
import { ImgPlaceHolder } from "../common";
import { bookHerf, coverUrl } from "../../api/url";

const StyledBook = styled.li`
  text-align: center;
  width: 135px;
  margin: 5px 15px;
  float: left;
  &:after,
  &:before {
    content: "";
    clear: both;
  }
`;

const BookLink = styled.a`
  text-decoration: none;
  color: #414d5d;
  font-size: 14px;
  text-align: center;
  display: inset-block;
  width: 100%;
  > img {
    max-height: 190px;
    max-width: 100%;
  }
`;

function Book({ title, bKey, coverID }) {
  return (
    <StyledBook>
      <BookLink href={bookHerf(bKey, title)}>
        {coverID ? (
          <img alt={title} src={coverUrl(`${coverID}-M`)} />
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
