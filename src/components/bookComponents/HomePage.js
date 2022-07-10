import styled from "styled-components";
import { Link } from "react-router-dom";
import BookContext from '../../contexts/bookContext';
import { useEffect, useContext } from 'react';
import axios from 'axios';

function HomePage() {
    const { bookList, setBookList } = useContext(BookContext);
    useEffect(() => {
        let URL = 'http://http://localhost:5000/books'
        let promise = axios.get(URL)
        promise.then(response => {
            setBookList(response.data);
        })
        promise.catch(handleError)
    }, [])

    function handleError(error) {
        alert(`${error.response.status} - ${error.response.data}`)
    }

    function Book({ title, image, author, price, bookID }) {
        return (
            <Link to={`/book/${bookID}`} style={{ textDecoration: 'none' }}>
                <BookStyled>
                    <img src={image} alt="" />
                    <h2>{title}</h2>
                    <p>{author}</p>
                    <p>{price}</p>
                </BookStyled>
            </Link>
        )
    }

    return (
        <Container>
            <Booklisting>
                {bookList.length > 0 ?
                    bookList.map((b, index) =>
                        <Book
                            key={index}
                            bookID={b._id}
                            price={b.price}
                            title={b.title}
                            image={b.image}
                            author={b.author}
                        />) :
                    ""}
            </Booklisting>
        </Container>
    )
}

const Container = styled.div`
  margin: 60px 0;
  padding: 20px;
`;

const Booklisting = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

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
    font-size: 20px;
    line-height: 22px;
    text-align: center;
  }
  p {
    color: #878460;
  }
`;

export default HomePage;
