import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/userContext";
import Book from "../bookComponents/Book";

function Cart () {
    const { userData } = useContext(UserContext)


    return (
        <Container>
            <h1>Carrinho</h1>

            {userData.cart?.length > 0 ?
                userData.cart.map((f, index) =>
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


export default Cart