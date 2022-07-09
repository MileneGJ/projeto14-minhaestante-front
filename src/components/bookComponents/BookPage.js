import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookContext from "../../contexts/bookContext";

function BookPage() {
    const { BookID } = useParams()
    const { bookList } = useContext(BookContext)
    const book = bookList.filter(b => b._id === BookID)[0]
    return (
        <Container>
                <h1>{book.title}</h1>
                <div>
                    <ion-icon name="heart"></ion-icon>
                    <ion-icon name="cart"></ion-icon>
                </div>
                <img src={book.image} alt="" />
                <ul>
                    <li>{`Preço: ${book.price}`}</li>
                    <li>{`Autor(a): ${book.author}`}</li>
                    <li>{`Editora: ${book.publisher}`}</li>
                    <li>{`Gênero: ${book.genre}`}</li>
                    <li>{`Descrição: ${book.description}`}</li>
                    <li>{`Formato: ${book.type}`}</li>
                    <li>{`Páginas: ${book.pages}`}</li>
                </ul>
                <button>Comprar livro</button>
        </Container>
    )
}

const Container = styled.div`
margin:110px 0;
padding:20px;
box-sizing:border-box;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;


h1{
    font-size:30px;
    font-weight:700;
    color:#878460;
    line-height:50px;
}
ion-icon{
    font-size:26px;
    color:#878460;
    margin:10px;
}
ul{
    color:#878460;
    padding:20px 0 0 20px;
    box-sizing:border-box;
    width:100%;
    font-size:18px;
}
li{
    margin:10px 0;
}
li:first-child{
    font-weight:700;
}
img{
    width:40vh;
    margin:20px 0;
}
button{
    margin-top:40px;
    height:40px;
    width:120px;
    background-color:#878460;
    border-radius:50px;
    border:none;
    color:#E7DDC8;
    font-size:16px;
}
`


export default BookPage