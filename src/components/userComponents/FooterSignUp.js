import styled from "styled-components";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import joi from "joi";

function FooterSignUp({ show }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Cadastrar");

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
      setDisable(true);
      show(false)
    } catch (error) {
      console.log(error);
      alert(`${error.response.data}`);
      setDisable(false);
      setButtonCtt("Cadastrar");
    }
  }
  return (
    <Container>
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
            type="password"
            placeholder="Senha*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={disable}
          />
          <input
            type="password"
            placeholder="Confirme a senha*"
            value={passConfirm}
            onChange={(e) => setPassConfirm(e.target.value)}
            required
            disabled={disable}
          />
          <button type="submit">{buttonCtt}</button>
        </Disabled>
      </Forms>
      <Linked
        onClick={() => {
          show(false);
        }}
      >
        Já tem uma conta? Clique aqui!
      </Linked>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 60px;
  width: 100%;
  border-radius: 40px 40px 0 0;
  background-color: #96482b;
 
  p {
    font-size: 20px;
    font-weight: 500;
    color: #fda279;
    margin-top: 20px;
  }
`;
const Forms = styled.form`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:10px 0;
  input {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid #878460;
    width: 100%;
    height: 50px;
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
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }
  button {
    margin:0;
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

export default FooterSignUp;
