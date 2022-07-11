import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BookContext from "../../contexts/bookContext";
import UserContext from "../../contexts/userContext";

function BookPage() {
  const { BookID } = useParams();
  const { bookList } = useContext(BookContext);
  const book = bookList.filter((b) => b._id === BookID)[0];
  const { userData, setUserData } = useContext(UserContext);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  function verifyLike() {
    let isBookFavorite;
    if (userData.favorites?.length > 0) {
      isBookFavorite = userData.favorites.filter((f) => f?._id === BookID);
      if (isBookFavorite.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function verifyCart() {
    let isBookOnCart;
    if (userData.cart?.length > 0) {
      isBookOnCart = userData.cart.filter((c) => c?._id === BookID);
      if (isBookOnCart.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function addToCart() {
    if (userData.userId) {
      const URL = `https://apimyshelf.herokuapp.com/users/cart/${userData.userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.post(URL, book, config);
      promise.then((response) => setUserData(response.data));
      promise.catch((error) => alert(error.response.data));
    } else {
        navigate("/login");

    }
  }

  function addToFavorites() {  
    if (userData.userId) {
      const URL = `https://apimyshelf.herokuapp.com/users/favorites/${userData.userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.post(URL, book, config);
      promise.then((response) => setUserData(response.data));
      promise.catch((error) => alert(error.response.data));
    } else {
        navigate("/login");

    }
  }

  return (
    <Container liked={verifyLike()} isOnCart={verifyCart()}>
      <h1>{book.title}</h1>
      <div>
        <ion-icon onClick={addToFavorites} name="heart"></ion-icon>
        <ion-icon onClick={addToCart} name="cart"></ion-icon>
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
      <button onClick={addToCart}>Comprar livro</button>
    </Container>
  );
}

const Container = styled.div`
  margin: 60px 0;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 30px;
    font-weight: 700;
    color: #878460;
    line-height: 50px;
  }
  ion-icon {
    font-size: 26px;
    color: #878460;
    margin: 10px;
  }
  ion-icon[name="heart"] {
    color: ${({ liked }) => (liked ? "red" : "#878460")};
  }
  ion-icon[name="cart"] {
    color: ${({ isOnCart }) => (isOnCart ? "blue" : "#878460")};
  }
  ul {
    color: #878460;
    padding: 20px 0 0 20px;
    box-sizing: border-box;
    width: 100%;
    font-size: 18px;
  }
  li {
    margin: 10px 0;
  }
  li:first-child {
    font-weight: 700;
  }
  img {
    width: 40vh;
    margin: 20px 0;
  }
  button {
    margin-top: 40px;
    margin-bottom: 60px;
    height: 40px;
    width: 140px;
    background-color: #878460;
    border-radius: 50px;
    border: none;
    color: #e7ddc8;
    font-size: 16px;
    font-weight: 700;
  }
`;

export default BookPage;
