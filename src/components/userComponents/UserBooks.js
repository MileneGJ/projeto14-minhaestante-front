import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserBooks () {
    const userID=10
const [userBooks, setUserBooks] = useState([])
/*
useEffect(()=>{
    const URL=`localhost:5000/users/${userID}`;
    const promise = axios.get(URL)
    promise.then(response=>{
        setUserBooks(response.data)
    })
    promise.catch(handleError)
},[])*/

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

function AddNewBook () {
    return(
        <>
        <h2>Você ainda não desapegou <br /> de nenhum livro</h2>
        <Link style={{textDecoration:"none"}} to="/new-detach">
            <button>Adicione seu primeiro desapego</button>
        </Link>        
        </>
    )
}

    return (
        <Container>
            <BookstoSell>
            {userBooks.length>0?
            userBooks.map((b,index)=>
                <Book
                key={index}
                title={b.title}
                image={b.image}
                author={b.author} 
                />):
                <AddNewBook />}
            </BookstoSell>
        </Container>
    )
}

const Container = styled.div`
margin:60px  0;
padding:20px;
`

const BookstoSell = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
height:60vh;

h2{
    color:#878460;
    font-size:20px;
    line-height:30px;
    text-align:center;
}
button{
    margin:20px 0;
    box-sizing:border-box;
    height:50px;
    width:200px;
    border:none;
    background-color:#878460;
    border-radius:5px;
    font-weight:700;
    color:#E7DDC8;
    font-size:16px;
}
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


export default UserBooks