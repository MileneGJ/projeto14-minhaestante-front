import styled from "styled-components";
import axios from "axios";
import FooterLogin from "./FooterLogin";
import Book from "../bookComponents/Book";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserBooks() {
    const [appearFooterLogin, setAppearFooterLogin] = useState(false)
    const [userBooks, setUserBooks] = useState([]);
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    useEffect(() => {
            const URL = `https://apimyshelf.herokuapp.com/books/user/${userId}`;
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const promise = axios.get(URL,config)
            promise.then(response => {
                setUserBooks(response.data)
            })
            promise.catch(handleError)
    }, [])

    function handleError(error) {
        if(error.response.status===401){
            setAppearFooterLogin(true)
        } else {
            alert(`${error.response.status} - ${error.response.data}`)
        }
    }


    function AddNewBook() {
        return (
            <>
                <h2>Você ainda não desapegou <br /> de nenhum livro</h2>
                <Link to="/new-detach">
                    <button>Adicione seu primeiro desapego</button>
                </Link>
            </>
        )
    }

    function BookList() {
        return (
            <>
                <span>
                    <h1>Meus desapegos</h1>
                    <Link to="/new-detach">
                    <ion-icon name="add-circle"></ion-icon>
                    </Link>
                </span>
                <div>
                    {userBooks.map((b, index) =>
                        <Book
                            key={index}
                            bookID={b._id}
                            title={b.title}
                            image={b.image}
                            author={b.author}
                            price={b.price}
                            status={b.status}
                        />)}
                </div>
            </>
        )
    }

    return (
        <Container>
            <div style={{ display: appearFooterLogin ? 'flex' : 'none' }}>
                <FooterLogin show={setAppearFooterLogin} />
            </div>
            <BookstoSell hasList={userBooks.length > 0 ? "s" : "n"}>
                {userBooks.length > 0 ?
                    <BookList />
                    :
                    <AddNewBook />}
            </BookstoSell>
        </Container>
    )
}

const Container = styled.div`
margin:60px 0;
padding:20px;
box-sizing:border-box;
`

const BookstoSell = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:${({ hasList }) => hasList === "s" ? 'flex-start' : 'center'};
justify-content:${({ hasList }) => hasList === "s" ? 'flex-start' : 'center'};
height:60vh;

>div{
    width:100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    align-items:center;
}
span{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 10px;
    box-sizing:border-box;
    
    h1{
    margin:30px 0;
    font-size: 20px;
    font-weight: 700;
    color: #878460;
    line-height:60px;
    }
}

ion-icon{
    font-size:30px;
    color: #878460;
}

>h2{
    color:#878460;
    font-size:20px;
    line-height:30px;
    text-align:center;
}
button{
    margin:20px 0;
    box-sizing:border-box;
    height:55px;
    width:200px;
    border:none;
    background-color:#878460;
    border-radius:50px;
    font-weight:700;
    color:#E7DDC8;
    font-size:16px;
}
`


export default UserBooks