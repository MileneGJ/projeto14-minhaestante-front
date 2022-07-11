import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";
import PurchaseContext from "../../contexts/purchaseContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function Checkout() {
  const { userData, setUserData } = useContext(UserContext);
  const { purchaseDetails, setPurchaseDetails } = useContext(PurchaseContext);
  const [pixColor, setPixColor] = useState(false);
  const [cardColor, setCardColor] = useState("#666966");
  const [ticketColor, setTicketColor] = useState("#666966");
  const [payPalColor, setPayPalColor] = useState("#666966");
  let token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (purchaseDetails.address.length === 0) {
      alert("Você precisa adicionar seu endereço no carrinho!");
      navigate("/cart");
      return;
    }
  }, []);
  function goToConfirm() {
    try {
      const URL = `https://apimyshelf.herokuapp.com/users/bought/${userData.userId}`;
      const promise = axios.post(URL, userData.cart);
      promise.then((response) => setUserData(response.data));
      alert(
        `Sua compra será confirmada mediante pagamento por ${purchaseDetails.payWay}`
      );

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      navigate("/");
    } catch (error) {}
  }
  function clicked() {
    setPixColor(!pixColor);
    setTicketColor("#666966");
    setCardColor("#666966");
    setPayPalColor("#666966");
    purchaseDetails.payWay === "Pix"
      ? setPurchaseDetails({ ...purchaseDetails, payWay: "" })
      : setPurchaseDetails({ ...purchaseDetails, payWay: "Pix" });
  }
  function iconClicked(name) {
    if (name === "card") {
      cardColor === "#666966"
        ? setCardColor("#878460")
        : setCardColor("#666966");
      purchaseDetails.payWay === "Cartão"
        ? setPurchaseDetails({ ...purchaseDetails, payWay: "" })
        : setPurchaseDetails({ ...purchaseDetails, payWay: "Cartão" });

      setTicketColor("#666966");
      setPayPalColor("#666966");
      setPixColor(false);
    } else if (name === "barcode") {
      ticketColor === "#666966"
        ? setTicketColor("#878460")
        : setTicketColor("#666966");
      purchaseDetails.payWay === "Boleto"
        ? setPurchaseDetails({ ...purchaseDetails, payWay: "" })
        : setPurchaseDetails({ ...purchaseDetails, payWay: "Boleto" });
      setCardColor("#666966");
      setPayPalColor("#666966");
      setPixColor(false);
    } else if (name === "paypal") {
      payPalColor === "#666966"
        ? setPayPalColor("#878460")
        : setPayPalColor("#666966");
      purchaseDetails.payWay === "Paypal"
        ? setPurchaseDetails({ ...purchaseDetails, payWay: "" })
        : setPurchaseDetails({ ...purchaseDetails, payWay: "Paypal" });
      setCardColor("#666966");
      setTicketColor("#666966");
      setPixColor(false);
    }
  }
  return (
    <Container>
      <h1>Finalização de pedido:</h1>
      <p>Endereço de Entrega:</p>
      <span>{purchaseDetails.address}</span>
      <p>Valor da Compra:</p>
      <span>{purchaseDetails.total}</span>
      <p>Selecione a forma de pagamento:</p>
      <div>
        <div>
          <PixIcon
            onClick={clicked}
            status={pixColor}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs />
            <g>
              <path d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138 97.139c-30.326 30.344-79.505 30.344-109.85 0l-97.415-97.416h9.232zm280.068-271.294c-20.056 0-38.929 7.809-53.12 22l-76.97 76.99c-5.551 5.53-14.6 5.568-20.15-.02l-76.711-76.693c-14.192-14.191-33.046-21.999-53.12-21.999h-9.234l97.416-97.416c30.344-30.344 79.523-30.344 109.867 0l97.138 97.138h-15.116z" />
              <path d="M22.758 200.753l58.024-58.024h31.787c13.84 0 27.384 5.605 37.172 15.394l76.694 76.693c7.178 7.179 16.596 10.768 26.033 10.768 9.417 0 18.854-3.59 26.014-10.75l76.989-76.99c9.787-9.787 23.331-15.393 37.171-15.393h37.654l58.3 58.302c30.343 30.344 30.343 79.523 0 109.867l-58.3 58.303H392.64c-13.84 0-27.384-5.605-37.171-15.394l-76.97-76.99c-13.914-13.894-38.172-13.894-52.066.02l-76.694 76.674c-9.788 9.788-23.332 15.413-37.172 15.413H80.782L22.758 310.62c-30.344-30.345-30.344-79.524 0-109.868" />
            </g>
          </PixIcon>
          <ion-icon
            onClick={() => iconClicked("card")}
            style={{ color: cardColor }}
            name="card-outline"
          ></ion-icon>
          <ion-icon
            onClick={() => iconClicked("paypal")}
            style={{ color: payPalColor }}
            name="logo-paypal"
          ></ion-icon>
          <ion-icon
            onClick={() => iconClicked("barcode")}
            style={{ color: ticketColor }}
            name="barcode"
          ></ion-icon>
        </div>
        <button onClick={goToConfirm}>Confirmar!</button>
      </div>
    </Container>
  );
}
const Container = styled.div`
  margin: 60px 0;
  padding: 57px 30px;
  color: #878460;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 20px 0;
    }
  }
  h1 {
    font-weight: 600;
    padding-bottom: 45px;
  }
  p {
    font-weight: 500;
    padding-bottom: 10px;
  }
  span {
    padding-bottom: 20px;
  }
  ion-icon {
    font-size: 40px;
    margin-left: 15px;
  }
  button {
    background-color: #878460;
    border: none;
    border-radius: 50px;
    color: #e7ddc8;
    font-size: 16px;
    font-weight: 700;
    height: 40px;
    width: 200px;
  }
`;
const PixIcon = styled.svg`
  width: 40px;
  fill: ${(props) => (props.status ? "#878460" : "#666966")};
`;

// const Card = styled.svg`
//   color: ${(props) => (props.status ? "#878460" : "#666966")};
// `;
// const Ticket = styled.svg`
//   color: ${(props) => (props.status ? "#878460" : "#666966")};
// `;
// const PayPal = styled.svg`
//   color: ${(props) => (props.status ? "#878460" : "#666966")};
// `;
