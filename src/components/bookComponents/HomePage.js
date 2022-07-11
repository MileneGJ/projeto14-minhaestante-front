import styled from "styled-components";
import Book from "./Book";
import BookContext from '../../contexts/bookContext';
import { useEffect, useContext } from 'react';
import axios from 'axios';

function HomePage() {
    const { bookList, setBookList } = useContext(BookContext);
    useEffect(() => {
        let URL = 'http://localhost:5000/books?field=status&keyword=A-venda'
        let promise = axios.get(URL)
        promise.then(response => {
            setBookList(response.data);
        })
        promise.catch(handleError)
    }, [])

    function handleError(error) {
        alert(`${error.response.status} - ${error.response.data}`)
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
                            status={b.status}
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
  a{
    margin: 13px 13px;
  }
`;

export default HomePage;
