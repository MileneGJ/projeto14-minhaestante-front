import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Bars } from "react-loader-spinner";

export default function DeleteUser() {
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Sim,  me despedir do My Shelf");
  const navigate = useNavigate();

  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      password: password,
    },
  };
  async function deleteHandler(event) {
    event.preventDefault();
    if (password.length === 0) {
      alert("Para deletar a conta é obrigatório digitar a senha!");
      return;
    }
    setButtonCtt(<loadingData.Component {...loadingData.props} />);
    setDisable(true);

    try {
      await axios.delete(`https://apimyshelf.herokuapp.com/users/${userId}`, config);
      navigate("/");
      setDisable(false);
    } catch (error) {
      console.log(error);
      alert(`${error.response.data}`);
      setDisable(false);
      setButtonCtt("Sim,  me despedir do My Shelf");
    }
  }

  return (
    <Container>
      <h1>Deletar minha conta</h1>
      <p>
        Tem certeza que quer <br />
        deixar nossa plataforma?
      </p>
      <Disabled disabled={disable}>
        <KeepAccount onClick={() => navigate("/profile")}>
          Não, continuar na comunidade
        </KeepAccount>
        <DeleteAccount onClick={deleteHandler}>{buttonCtt}</DeleteAccount>
        <Pass>
          <input
            type="password"
            placeholder="SENHA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={disable}
          />
        </Pass>
      </Disabled>
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
  p {
    text-align: center;
    color: #666966;
    font-size: 15px;
    margin-bottom: 10px;
  }
  button {
    margin: 10px 0;
  }
`;

const DeleteAccount = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 46px;
  background-color: #96482b;
  color: #e7ddc8;
  font-size: 15px;
  font-weight: 700;
`;

const KeepAccount = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 46px;
  background-color: #878460;
  color: #e7ddc8;
  font-size: 15px;
  font-weight: 700;
`;
const Pass = styled.div`
  border-top: 2px solid #878460;
  box-sizing: border-box;
  padding-top: 10px;
  width: 100%;
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
`;
