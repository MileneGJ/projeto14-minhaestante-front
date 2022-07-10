import styled from "styled-components";
import FooterLogin from "./FooterLogin";
import Book from "../bookComponents/Book";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/userContext";

function LikedBooks() {
    const [appearFooterLogin, setAppearFooterLogin] = useState(false)
    const { userData } = useContext(UserContext)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        if (userData.token) {
            setFavorites(userData.favorites)
        } else {
            setAppearFooterLogin(true)
        }
    }, [])

    return (
        <Container>
            <h1>Lista de desejos</h1>
            <div style={{ display: appearFooterLogin ? 'flex' : 'none' }}>
                <FooterLogin show={setAppearFooterLogin} />
            </div>
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
    line-height:60px;
}
`

export default LikedBooks