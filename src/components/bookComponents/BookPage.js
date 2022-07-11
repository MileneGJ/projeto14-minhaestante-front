import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FooterLogin from "../userComponents/FooterLogin";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/userContext";

function BookPage() {
  const { BookID } = useParams();
  const [appearFooterLogin, setAppearFooterLogin] = useState(false);
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [book, setBook] = useState({});
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    const URL = `https://apimyshelf.herokuapp.com/books?field=_id&keyword=${BookID}`;
    const promise = axios.get(URL);
    promise.then((response) => setBook(response.data[0]));
    promise.catch(handleError);
  }, []);

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
    if (userId) {
      const URL = `https://apimyshelf.herokuapp.com/users/cart/${userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.post(URL, book, config);
      promise.then((response) => setUserData(response.data));
      promise.catch(handleError);
    } else {
      setAppearFooterLogin(true);
    }
  }

  function addToFavorites() {
    if (userId) {
      const URL = `https://apimyshelf.herokuapp.com/users/favorites/${userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.post(URL, book, config);
      promise.then((response) => setUserData(response.data));
      promise.catch(handleError);
    } else {
      setAppearFooterLogin(true);
    }
  }

  function handleError(error) {
    if (error.response.status === 401) {
      setAppearFooterLogin(true);
    } else {
      alert(`${error.response.status} - ${error.response.data}`);
    }
  }

  function goToCart() {
    addToCart();
    navigate("/cart");
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
      <button className="cartButton" onClick={goToCart}>
        Comprar livro
      </button>
      <div style={{ display: appearFooterLogin ? "flex" : "none" }}>
        <FooterLogin show={setAppearFooterLogin} />
      </div>
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
  .cartButton {
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
