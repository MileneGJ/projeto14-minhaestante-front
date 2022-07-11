import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Bars } from "react-loader-spinner";
import joi from "joi";

export default function UpdateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Atualizar os dados");
  const [oldPassword, setOldPassword] = useState("");
  const navigate = useNavigate();
  let userId = localStorage.getItem("userId");
  let oldName = localStorage.getItem("name");
  let oldEmail = localStorage.getItem("email");

  useEffect(() => {
    setName(oldName);
    setEmail(oldEmail);
  }, []);
  const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().required(),
    passConfirm: joi.string().valid(joi.ref("password")).required(),
  });
  async function updateHandler(event) {
    event.preventDefault();
    let token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

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
      setButtonCtt("Atualizar os dados");
      return;
    }
    try {
      await axios.put(`https://apimyshelf.herokuapp.com/users/${userId}`, {
        ...body,
        oldPassword,
        config,
      });
      navigate("/profile");
      setDisable(false);
    } catch (error) {
      console.log(error);
      alert(`${error.response.data}`);
      setDisable(false);
      setButtonCtt("Atualizar os dados");
    }
  }

  return (
    <Container>
      <h1>Alterar meus dados</h1>
      <Forms onSubmit={updateHandler}>
        <Disabled disabled={disable}>
          <input
            type="text"
            placeholder="NOME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={disable}
          />

          <input
            type="text"
            placeholder="E-MAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={disable}
          />
          <input
            type="password"
            placeholder="SENHA*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={disable}
          />
          <input
            type="password"
            placeholder="CONFIRMAÇÃO DE SENHA"
            value={passConfirm}
            onChange={(e) => setPassConfirm(e.target.value)}
            required
            disabled={disable}
          />
          <OldPass>
            <input
              type="password"
              placeholder="SENHA ANTIGA"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              disabled={disable}
            />
          </OldPass>
          <button type="submit">{buttonCtt}</button>
        </Disabled>
      </Forms>
      <Linked to={"/profile"}>Voltar</Linked>
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
  padding: 57px 30px;
  color: #878460;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  align-items: center;
  h1 {
    font-weight: 600;
    padding-bottom: 45px;
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
    margin-bottom: 10px;
    font-weight: 400;
    &::placeholder {
      color: #878460;
      font-family: "Montserrat", sans-serif;
      padding-left: 15px;
      font-size: 14px;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 46px;
    background-color: #96482b;
    color: #e7ddc8;
    font-size: 20px;
    font-weight: 700;
  }
`;

const Linked = styled(Link)`
  color: #878460;
  font-size: 14px;
  font-weight: 500;
  padding-top: 10px;
`;
const OldPass = styled.div`
  border-top: 2px solid #878460;
  box-sizing: border-box;
  padding-top: 10px;
  width: 100%;
`;
