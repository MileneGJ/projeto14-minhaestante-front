import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import joi from "joi";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Cadastrar");
  const navigate = useNavigate();

  const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().required(),
    passConfirm: joi.string().valid(joi.ref("password")).required(),
  });

  async function signUpHandler(event) {
    event.preventDefault();
    setButtonCtt(<loadingData.Component {...loadingData.props} />);
    setDisable(true);

    let body = {
      name,
      email,
      password,
      passConfirm,
    };
    const validation = signUpSchema.validate(body);

    if (validation.error) {
      alert("Confirmação de senha não condiz!");
      setDisable(false);
      setButtonCtt("Cadastrar");
      return;
    }
    try {
      await axios.post("https://apimyshelf.herokuapp.com/sign-up", body);
      navigate("/login");
      setDisable(false);
    } catch (error) {
      console.log(error);
      alert(`${error.response.data}`);
      setDisable(false);
      setButtonCtt("Cadastrar");
    }
  }
  return (
    <Container>
      <div>
        <p>Cadastre-se!</p>
        <Forms onSubmit={signUpHandler}>
          <Disabled disabled={disable}>
            <input
              type="text"
              placeholder="Nome*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="text"
              placeholder="E-mail*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="text"
              placeholder="Senha*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="text"
              placeholder="Confirme a senha*"
              value={passConfirm}
              onChange={(e) => setPassConfirm(e.target.value)}
              required
              disabled={disable}
            />
            <button type="submit">{buttonCtt}</button>
          </Disabled>
        </Forms>
        <Linked to={"/login"}>Já tem uma conta? Clique aqui!</Linked>
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
  justify-content: center;
  height: 85vh;

  > div {
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    p {
      font-size: 20px;
      font-weight: 500;
      color: #fda279;
    }
  }
`;
const Forms = styled.form`
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
const Linked = styled(Link)`
  color: #fda279;
  font-size: 14px;
  font-weight: 500;
`;

export default SignUp;
