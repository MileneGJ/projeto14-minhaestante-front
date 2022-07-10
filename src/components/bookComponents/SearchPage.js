import styled from "styled-components";
import searchBookContext from '../../contexts/searchBookContext';
import { useContext } from 'react';
import Book from "./Book";

function SearchPage() {
    const { searchBookList } = useContext(searchBookContext);

    return (
        <Container>
            <Booklisting>
                {searchBookList.length > 0 ?
                    searchBookList.map((b, index) =>
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
margin:110px 0;
padding:20px;
`

const Booklisting = styled.div`
width:100%;
display:flex;
justify-content:space-between;
flex-wrap:wrap;
`


export default SearchPage