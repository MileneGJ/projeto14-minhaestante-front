import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { useState, useContext } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUserData} = useContext(UserContext)

  const navigate = useNavigate();
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
        "http://localhost:5000/sign-in",
        body
      );
      setUserData(resp.data);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("userId", resp.data.userId);
      localStorage.setItem("name", resp.data.name);
      localStorage.setItem("email", resp.data.email);
      navigate("/");
      setDisable(false);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
      setDisable(false);
      setButtonCtt("Entrar");
    }
  }
  return (
    <Container>
      <div>
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
        <Linked to={"/sign-up"}>Ainda não tem cadastro? Clique aqui!</Linked>
      </div>
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
  margin: 60px 0;
  padding: 20px;
  background-color: #96482b;
  display: flex;
  align-items: center;
  height: 85vh;
  justify-content: center;
  > div {
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 30px;
    p {
      font-size: 20px;
      font-weight: 500;
      color: #fda279;
    }
  }
`;
const Forms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    box-sizing: border-box;
    border-radius: 5px;
    padding:0 15px;
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
const Linked = styled(Link)`
  color: #fda279;
  font-size: 14px;
  font-weight: 500;
`;

export default Login;
