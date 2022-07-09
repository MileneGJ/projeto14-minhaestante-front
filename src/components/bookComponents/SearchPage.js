import styled from "styled-components";
import searchBookContext from '../../contexts/searchBookContext';
import { useEffect, useContext } from 'react';
import axios from 'axios';

function SearchPage() {
    const { searchBookList } = useContext(searchBookContext);

    function Book({ title, image, author }) {
        return (
            <BookStyled>
                <img src={image} alt="" />
                <h2>{title}</h2>
                <p>{author}</p>
            </BookStyled>
        )
    }

    return (
        <Container>
            <Booklisting>
                {searchBookList.length > 0 ?
                    searchBookList.map((b, index) =>
                        <Book
                            key={index}
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

const BookStyled = styled.div`
width:140px;
height:200px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
overflow:hidden;
img{
    height:110px;
}
h2{
    margin:8px 0;
    color:#878460;
    font-weight:700;
    font-size:20px;
    line-height:22px;
    text-align:center;
}
p{
    color:#878460;
}
`

export default SearchPage