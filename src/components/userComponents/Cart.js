import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/userContext";
import PurchaseContext from "../../contexts/purchaseContext";
import axios from "axios";

function Cart() {
  const { userData} = useContext(UserContext);
  const { purchaseDetails, setPurchaseDetails } = useContext(PurchaseContext);
  const navigate = useNavigate();
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");

  useEffect(() => {
    const URL = `http://localhost:5000/users/cart/${userId}`;
    const config = {
      headers:{
          Authorization:`Bearer ${token}`
      }
  }
  const promise = axios.get(URL,config);
  promise.then(response=>{
  let sum = 0;
    if (response.data.length > 0) {
      response.data.map((b) => {
        sum += parseInt(b.price.replace("R$", "").replace(/,/, /\./));
      });
    }
    let formattedTotal = `R$${sum.toFixed(2)}`.replace(/\./, ",");
    setPurchaseDetails({ ...purchaseDetails, total: formattedTotal, productList:response.data });
  })
  promise.catch(handleError)
  }, []);

  function handleError(error) {
    alert(`${error.response.status} - ${error.response.data}`);
    if(error.response.status===401){
      navigate("/login")
    }
  }

  function changeAddress() {
    let newAddress = prompt("Digite o endereço de entrega:");
    setPurchaseDetails({ ...purchaseDetails, address: newAddress });
  }

function goToCheckout(){
  if (purchaseDetails.address?.length===0) {
    alert("Você precisa adicionar seu endereço no carrinho!");
  } else {
    navigate("/checkout")
  }
}


  function BookToBuy({ bookID, price, title, image, author }) {
    return (
      <Link to={`/book/${bookID}`}>
        <BookInfo>
          <div>
            <img src={image} alt="" />
          </div>
          <span>
            <h2>{title}</h2>
            <p>{author}</p>
            <h3>{price}</h3>
          </span>
        </BookInfo>
      </Link>
    );
  }

  return (
    <Container>
      <h1>Meu Carrinho:</h1>

      {userData.cart?.length > 0 ? (
        <>
          <div>
            {userData.cart.map((f, index) => (
              <BookToBuy
                key={index}
                bookID={f._id}
                price={f.price}
                title={f.title}
                image={f.image}
                author={f.author}
              />
            ))}
          </div>
          <div>
            <h2>Entregar em:</h2>
            <p>{purchaseDetails.address}</p>
            <button onClick={changeAddress}>Modificar endereço</button>
          </div>
          <span>
            <h2>VALOR TOTAL:</h2>
            <h3>{purchaseDetails.total}</h3>
          </span>
          <button onClick={goToCheckout}>
            Finalizar Pedido
          </button>
        </>
      ) : (
        ""
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 60px 0;
  padding: 20px;
  box-sizing: border-box;
  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #878460;
    line-height: 60px;
  }
  button {
    background-color: #878460;
    border: none;
    border-radius: 50px;
    color: #e7ddc8;
    font-size: 16px;
    font-weight: 700;
    margin: 20px 0;
  }

  > button:last-child {
    margin: 0;
    height: 40px;
    width: 200px;
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);

  }

  > span {
    margin: 20px 20px 100px;
    display: flex;
    align-items: center;
  }
  > span h3 {
    margin: 0 10px;
  }

  h3 {
    color: #96482b;
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
  }

  h2 {
    color: #878460;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
  }
  p {
    color: #878460;
    font-size: 16px;
  }
`;
const BookInfo = styled.div`
  display: flex;

  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  div {
    overflow: hidden;
    margin: 20px;
    width: 140px;
  }
  img {
    width: 110px;
  }
`;

export default Cart;
