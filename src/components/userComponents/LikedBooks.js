import styled from "styled-components";
import FooterLogin from "./FooterLogin";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/userContext";

function LikedBooks() {
    const [appearFooterLogin, setAppearFooterLogin] = useState(false)
    const {userData} = useContext(UserContext)
    const [favorites, setFavorites] = useState([])

    useEffect(()=>{
        if(userData.length>0) {
            console.log(userData)
            setFavorites(userData.favorites)
        } else {
            console.log("nao tem token")
            setAppearFooterLogin(true)
        }
    },[])

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
            <h1>Lista de desejos</h1>
            <div  style={{display:appearFooterLogin?'flex':'none'}}> <FooterLogin /> </div>
            {favorites?.length > 0 ?
                favorites.map((f, index) =>
                    <Book
                        key={index}
                        bookID={f._id}
                        price={f.price}
                        title={f.title}
                        image={f.image}
                        author={f.author}
                    />)
                :
                ""}
        </Container>
    )
}

const Container = styled.div`
margin:60px  0;
padding:20px;
box-sizing:border-box;
h1{
    font-size: 20px;
    font-weight: 700;
    color: #878460;
}
`
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

export default LikedBooks