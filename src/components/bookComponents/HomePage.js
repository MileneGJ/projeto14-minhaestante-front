import styled from "styled-components";
import {useState, useEffect} from 'react';
import axios from 'axios';

function HomePage () {
    const [bookList,setBooklist] = useState([])

    useEffect(()=>{
        let URL = 'http://localhost:5000/books'
        let promise = axios.get(URL)
        promise.then(response=>{
            setBooklist(response.data)
        })
        promise.catch(handleError)
    },[])

    function handleError (error){
        alert(`${error.response.status} - ${error.response.data}`)
    }

    function Book ({title, image, author}) {
        return(
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
            {bookList.length>0?
            bookList.map((b,index)=>
                <Book
                key={index}
                title={b.title}
                image={b.image}
                author={b.author} 
                />):
                ""}
            </Booklisting>
        </Container>
    )
}

const Container = styled.div`
margin-top:110px;
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
height:180px;
overflow:hidden;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
img{
    height:110px;
}
h2{
    color:#878460;
    font-weight:700;
    font-size:20px;
    line-height:30px;
}
p{
    color:#878460;
}
`

export default HomePage