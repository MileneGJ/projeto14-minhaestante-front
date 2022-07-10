import styled from "styled-components"
import { Link } from "react-router-dom"

export default function Book({ title, image, author, price, bookID }) {
    return (
        <Link to={`/book/${bookID}`} >
            <BookStyled>
                <img src={image} alt="" />
                <h2>{title}</h2>
                <p>{author}</p>
                <p>{price}</p>
            </BookStyled>
        </Link>
    )
}

const BookStyled = styled.div`
  width: 140px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    height: 110px;
  }
  h2 {
    margin: 8px 0;
    color: #878460;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
  p {
    color: #878460;
    font-size:16px;
  }
`;