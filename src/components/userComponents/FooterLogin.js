import styled from "styled-components";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import FooterSignUp from "./FooterSignUp";

function FooterLogin() {
  const [appearFooterSignUp, setAppearFooterSignUp] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Entrar");

  async function signInHandler(event) {
    event.preventDefault();
    setButtonCtt(<loadingData.Component {...loadingData.props} />);
    setDisable(true);

    let body = {
      email,
      password,
    };
    try {
      const resp = await axios.post(
        "https://apimyshelf.herokuapp.com/sign-in",
        body
      );
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("name", resp.data.name);
      
      setDisable(false);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
      setDisable(false);
      setButtonCtt("Entrar");
    }
  }


  function appearSignUp () {
    setAppearFooterSignUp(true)
  }

  return (
    <Container>
      <div  style={{display:appearFooterSignUp?'none':'flex'}}>
        <p>Conecte-se à sua conta!</p>
        <Forms onSubmit={signInHandler}>
          <Disabled disabled={disable}>
            <input
              type="text"
              placeholder="E-mail*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="password"
              placeholder="Senha*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={disable}
            />
            <button type="submit">{buttonCtt}</button>
          </Disabled>
        </Forms>
        <Linked onClick={appearSignUp}>Ainda não tem cadastro? Clique aqui!</Linked>
      </div>
      <div style={{display:appearFooterSignUp?'flex':'none'}} ><FooterSignUp show={setAppearFooterSignUp} /> </div>
    </Container>
  );
}
function Disabled({ disabled, children }) {
  if (disabled) {
    return (
      <div style={{ opacity: 0.5 }} disabled>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

// the loading symbol
const loadingData = {
  Component: Bars,
  props: {
    color: "#e7ddc8",
    height: 40,
    width: 110,
  },
};

const Container = styled.div`
position:fixed;
top:60px;
left:0;
display:flex;
flex-direction:column;
justify-content:flex-end;
width:100%;
height:100vh;
background-color: rgba(0,0,0,0.2);
  > div {
    display: flex;
    margin-bottom:110px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 300px;
    border-radius: 40px 40px 0 0;
    background-color: #96482b;
    p {
      font-size: 18px;
      font-weight: 500;
      color: #fda279;
    }
  }
`;
const Forms = styled.form`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid #878460;
    width: 100%;
    height: 58px;
    background-color: #e7ddc8;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 400;
    &::placeholder {
      color: #878460;
      font-family: "Montserrat", sans-serif;
      padding-left: 15px;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 2px solid #878460;
    width: 100%;
    height: 46px;
    background-color: #96482b;
    color: #e7ddc8;
    font-size: 20px;
    font-weight: 700;
  }
`;
const Linked = styled.p`
  color: #fda279;
  font-size: 14px;
  font-weight: 500;
`;

export default FooterLogin;
